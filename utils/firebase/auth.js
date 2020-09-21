import {firebase, auth,firestore} from "./index";
import {getUserFromCredential, getUserFromGoogleOAuthResponse, setUserCookie} from "utils/user";
const users = "users";

const getOrCreateUserProfileDocument = async (user, additionalData) => {
  // if there is no user return - this happens on "mount"
  if (!user) return;
  // get a reference to this user's spot in the database
  const userRef = firestore.doc(`${users}/${user.uid}`);
  const userSnapshot = await userRef.get();
  // if that reference doesn't exist, create a new user
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
  // in both cases return the user
  return await getUserProfile(user.uid);
}

const signUp = async (email, password) => {
  // TODO: allow user to pass in display name if they want to
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const userData = getUserFromCredential(userCredential);
    setUserCookie(userData);
  } catch(error) {
    console.error(error);
    throw error;
  }
}

const signIn = async (email, password) => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    const userData = getUserFromCredential(user);
    setUserCookie(userData);
  } catch(error) {
    console.error(error);
    throw error;
  }
}

const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  try {
    const response = await auth.signInWithPopup(provider);
    const userData = getUserFromGoogleOAuthResponse(response);
    setUserCookie(userData);
  } catch(error) {
    console.error(error);
    throw error;
  }
};

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

const updateUserProfile = async (uid, updates) => {
  if (!uid) return null;
  try {
    const userDocumentRef = await firestore.collection(users).doc(uid);
    await userDocumentRef.update(updates);
  } catch(error) {
    console.error(error);
    throw error;
  }
}

export {
  auth,
  signIn,
  signUp,
  signInWithGoogle,
  signOut,
  getUserProfile,
  updateUserProfile,
  getOrCreateUserProfileDocument
}

class UserProfile {
  uid;
  displayName;
  email;
  photoURL;
  location;
  facebook;
  instagram;
  twitter;
  youtube;
  website;
}
