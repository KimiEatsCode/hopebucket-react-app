import React, { createContext, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorageReceipe";

export const Context = createContext();

function ListContext({ children }) {
  const [list, setList] = useLocalStorage("hopeList", []);

  return (
    <Context.Provider value={{ list, setList }}>{children}</Context.Provider>
  );
}

export default ListContext;
