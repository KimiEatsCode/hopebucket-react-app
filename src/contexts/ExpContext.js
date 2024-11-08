import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorageReceipe";

export const ExpContext = createContext();

export const ExpContextProvider = (props) => {

  const [expDate, setListDate] = useLocalStorage("listDate", "");

  return (
    <ExpContext.Provider value={{ expDate, setListDate }}>
      {props.children}
    </ExpContext.Provider>

    //props children are the components that render from index js that has a router that routes certain components depending on route url. ListContextProvider is on index js wrapped around stuff that is props children
  );
};
