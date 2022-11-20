import React from "react";
import { createContext } from "react";

export const StateContext = React.createContext({
  state: {},
  dispatch: () => {},
});
