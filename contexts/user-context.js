import React, { createContext } from "react";
import UserState from "stores/user";
import * as AWS from "utils/aws/user";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  return <UserContext.Provider value={new UserState(AWS, {username: '47e12680-8af6-4d05-98ae-3223d057603b'})}>{children}</UserContext.Provider>;
};