import React, { createContext } from "react";

import API from "utils/aws";
import EventState from "../stores/event";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  return <EventContext.Provider value={new EventState(API)}>{children}</EventContext.Provider>;
};