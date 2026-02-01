import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorageReceipe";
export const ListContext = createContext();
export const ListAgeContext = createContext();
export const ListContextProvider = (props) => {
  const [list, setList] = useLocalStorage("hopeList", []);

  const copyText = false;
  return (
    <ListContext.Provider value={{ list, setList, copyText }}>
      {props.children}
    </ListContext.Provider>
  );
};
