import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorageReceipe";

export const ListContext = createContext();
export const ListAgeContext = createContext();
export const ListContextProvider = (props) => {
  const [list, setList] = useLocalStorage("hopeList", []);

  return (
    <ListContext.Provider value={{ list, setList }}>
      {props.children}
    </ListContext.Provider>

    //props children are the components that render from index js that has a router that routes certain components depending on route url. ListContextProvider is on index js wrapped around stuff that is props children
  );
};
