import React, { createContext } from "react";

import UserState from "stores/user";
import * as AWS from "utils/aws/user";
import useQueryParam from "../hooks/use-query-param";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const uid = useQueryParam("uid");
  return <UserContext.Provider value={new UserState(AWS, { username: uid })}>{children}</UserContext.Provider>;
};