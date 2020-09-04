import React, { createContext } from "react";
import app from "firebase/app";
import 'firebase/auth'
import firebase from "firebase";
import {mapUserData, setUserCookie} from "../components/auth";

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
      callback({loggedIn: true, email: user.email});
    } else {
      callback({loggedIn: false});
    }
  });
}

function signIn(email, password) {
  app.auth().signInWithEmailAndPassword(email, password)
    .then(function({ user }) {
      // setLoading(false);
      // const userData = mapUserData()
      // setUserCookie(userData);
      // router.push('/');
    })
    .catch(function(error) {
      // setError({code: error.code, message: error.message });
      // setLoading(false);
    });
}

function signOut() {
  app.auth().signOut();
}

const FirebaseContext = createContext(null);
const UserContext = createContext({ loggedIn: false, email: "" });

export { FirebaseContext, UserContext, onAuthStateChange, signIn, signOut }