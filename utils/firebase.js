import React, { createContext } from "react";
import app from "firebase/app";
import 'firebase/auth'
import "firebase/firebase-database";
import {mapUserData, setUserCookie} from "../components/auth";

const WISHLET = 'wishlet-e7d50';

export default function FirebaseProvider({ children }) {
  if (!app.apps.length) {
    app.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    })
  }
  return (
    <FirebaseContext.Provider value={ app }>
      { children }
    </FirebaseContext.Provider>
  )
}

function onAuthStateChange(callback) {
  return app.auth().onAuthStateChanged((user) => {
    if (user) {
      callback({loggedIn: true, email: user.email, uid: user.uid });
    } else {
      callback({loggedIn: false});
    }
  });
}

function signIn(email, password) {
  return new Promise((resolve, reject) => {
    app.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const userData = mapUserData(user)

        setUserCookie(userData);
        resolve();
      })
      .catch(error => reject(error));
  });
}

function signUp(email, password) {
  return new Promise((resolve, reject) => {
    app.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        if (user) {
          app.database().ref('users').child(user.uid).set({
            email: user.email,
            displayName: '',
            bio: '',
            location: '',
            occupation: '',
            website: '',
            facebook: '',
            twitter: '',
            youtube: '',
            pinterest: '',
            instagram: '',
            followers: 0,
            following: 0,
          });
        }
        resolve();
      })
      .catch(error => reject(error));
    });
}

function signOut() {
  app.auth().signOut();
}

function getUserProfile(uid) {
  return new Promise((resolve, reject) => {
    app.database().ref(`users/${uid}`)
      .once('value')
      .then((snapshot) => resolve(snapshot))
      .catch(error => reject(error));
  });
}

// updateUserProfile(uid, profile)

function addWishlist(uid, name, link) {
  return new Promise((resolve, reject) => {
    app.database().ref('wishlists')
      .push({
        uid: uid,
        name: name,
        link: link
      })
      .then(() => resolve())
      .catch(error => reject(error))
  });
}

function getWishlistsForUser(uid) {
  return new Promise((resolve, reject) => {
    app.database().ref(`users/${uid}/wishlists`)
      .once('value')
      .then((snapshot) => {
        const wishlistIds = snapshot.val();
        console.log(wishlistIds);
        resolve(snapshot.val())
      })
      .catch(error => reject(error))
  });
}

const FirebaseContext = createContext(null);
const UserContext = createContext({ loggedIn: false, email: "" });

export {
  FirebaseContext,
  UserContext,
  onAuthStateChange,
  signIn,
  signUp,
  signOut,
  getUserProfile,
  addWishlist,
  getWishlistsForUser
};