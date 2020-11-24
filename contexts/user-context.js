import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {Auth, Hub} from "aws-amplify";
import {getUserFromCookie, setUserCookie} from "../utils/user";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const authListener = (data) => {
    switch (data.payload.event) {
      case 'signIn':
        setUser(data.payload.data);
        setLoading(false);
        router.push("/");
        break;
      case 'signUp':
        setUser(data.payload.data);
        setLoading(false);
        router.push("/");
        break;
      case 'signOut':
        setUser(null);
        setLoading(false);
        router.push("/signin");
        break;
      case 'signIn_failure':
        const error = data.payload.data;
        setError(error.message);
        setLoading(false);
        break;
      case 'configured':
        console.log('the Auth module is configured');
    }
  }

  useEffect(() => {
    Hub.listen('auth', authListener);
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(err => console.error(err));
    return () => Hub.remove('auth', authListener);
  }, []);

  const value = {
    user,
    loading,
    error,
    setError,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
