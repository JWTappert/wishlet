import firebase from "../firebase";
import {mapUserData, setUserCookie} from "../../components/auth";
const auth = firebase.auth();
const firestore = firebase.firestore();
const users = "users";

const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  // check if this user exists before creating a new one
  const userRef = firestore.doc(`users/${user.uid}`);
  const userSnapshot = await userRef.get();
  if (!userSnapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch(error) {
      console.error(error);
      throw error;
    }
  }
  return getUserProfile(user.uid);
}

const signUp = async (email, password) => {
  // TODO: allow user to pass in display name if they want to
  const user = await auth.createUserWithEmailAndPassword(email, password);
  return createUserProfileDocument(user);
}

const signIn = async (email, password) => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    const userData = mapUserData(user);
    setUserCookie(userData);
  } catch(error) {
    console.error(error);
    throw error;
  }
}

const signOut = async () => {
  auth.signOut();
}

const getUserProfile = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.collection(users).doc(uid).get();
    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export {
  auth,
  signIn,
  signUp,
  signOut,
  getUserProfile,
  createUserProfileDocument
}
