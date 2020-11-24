import React, {createContext } from "react";
export const RootContext = createContext({});
import RootState from "stores/Root";

export const RootProvider = ({ children }) => {
  return (
    <RootContext.Provider value={{...RootState.stores()}}>
      {children}
    </RootContext.Provider>
  )
};
