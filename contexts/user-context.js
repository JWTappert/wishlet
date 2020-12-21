import React, { createContext, useContext } from "react";

import UserState from "stores/user";
import API from "utils/aws";
import useQueryParam from "../hooks/use-query-param";
import {AuthContext} from "./auth-context";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const cognitoUser = useContext(AuthContext);
  let uid = useQueryParam("uid");

  if (!uid) {
    uid = cognitoUser?.username;
  }

  return <UserContext.Provider value={new UserState(API, { username: uid })}>{children}</UserContext.Provider>;
};