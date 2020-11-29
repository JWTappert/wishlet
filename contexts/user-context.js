import React, { createContext } from "react";

import UserState from "stores/user";
import API from "utils/aws";
import useQueryParam from "../hooks/use-query-param";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const uid = useQueryParam("uid");
  return <UserContext.Provider value={new UserState(API, { username: uid })}>{children}</UserContext.Provider>;
};