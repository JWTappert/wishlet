import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {Auth, Hub} from "aws-amplify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [authed, setAuthed] = useState();

  const authListener = (data) => {
    switch (data.payload.event) {
      case 'signIn':
        router.push("/");
        break;
      case 'signUp':
        router.push("/");
        break;
      case 'signOut':
        router.push("/signin");
        break;
      case 'signIn_failure':
        const error = data.payload.data;
        break;
      case 'configured':
        console.log('the Auth module is configured');
    }
  }

  useEffect(() => {
    Hub.listen('auth', authListener);
    Auth.currentAuthenticatedUser()
      .then(cognitoUser => {
        console.log('authContext', cognitoUser);
        setAuthed(cognitoUser)
      })
      .catch(err => console.error(err));
    return () => Hub.remove('auth', authListener);
  }, []);

  return <AuthContext.Provider value={authed}>{children}</AuthContext.Provider>;
};
