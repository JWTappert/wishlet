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
      const itemId = firebase.firestore().collection("temp").doc().id;
      firebase
        .firestore()
        .collection("wishlists")
        .doc(wishlistId)
        .update({
          items: firebase.firestore.FieldValue.arrayUnion({id: itemId, ...item}),
        })
        .then(() => resolve())
        .catch((error) => reject(error));
  });
}

function removeItemFromWishlist(wishlistId, itemId) {
  return new Promise((resolve, reject) => {
      if (wishlistId && itemId) {
          resolve({success: true });
      } else {
          reject({success: true });
      }
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
        querySnapshot.forEach((doc) => wishlists.push({id: doc.id, ...doc.data()}));
        resolve(wishlists);
      })
      .catch((error) => reject(error));
  });
}

function listenToWishlistChanges(wishlistId, onNext, onError) {
  if (!wishlistId) return;
    firebase
    .firestore()
    .collection("wishlists")
    .doc(wishlistId)
    .onSnapshot(
      (snapshot) => onNext(snapshot.data()),
    (error) => onError(error)
    );
}

export {
  addList,
  getWishlistsForUser,
  listenToWishlistChanges,
  addItemToWishlist,
  removeItemFromWishlist
};
