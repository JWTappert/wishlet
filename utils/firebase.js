import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}
export default firebase;

function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback({ loggedIn: true, email: user.email, uid: user.uid });
    } else {
      callback({ loggedIn: false });
    }
  });
}

function signIn(email, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const userData = mapUserData(user);
        setUserCookie(userData);
        resolve();
      })
      .catch((error) => reject(error));
  });
}

function signUp(email, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          firebase.firestore.collection("users").add({
            email: user.email,
            first: "",
            last: "",
            location: "",
            occupation: "",
            website: "",
            facebook: "",
            twitter: "",
            youtube: "",
            pinterest: "",
            instagram: "",
            followers: 0,
            following: 0,
          });
        }
        resolve();
      })
      .catch((error) => reject(error));
  });
}

function signOut() {
  firebase.auth().signOut();
}

function getUserProfile(uid) {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({ uid: snapshot.id, ...snapshot.data() });
        } else {
          throw new Error("User does not exist");
        }
      })
      .catch((error) => reject(error));
  });
}

// updateUserProfile(uid, profile)

function addList(uid, name) {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("wishlists")
      .add({
        uid: uid,
        name: name,
        items: [],
      })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}

function addItemToWishlist(wishlistId, item) {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("wishlists")
      .doc(wishlistId)
      .update({
        items: firebase.firestore.FieldValue.arrayUnion(item),
      })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}

function getWishlistsForUser(uid) {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("wishlists")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        const wishlists = [];
        querySnapshot.forEach((doc) => wishlists.push({ id: doc.id, ...doc.data() }));
        resolve(wishlists);
      })
      .catch((error) => reject(error));
  });
}
export {
  onAuthStateChange,
  signIn,
  signUp,
  signOut,
  getUserProfile,
  addList,
  getWishlistsForUser,
  addItemToWishlist,
};
