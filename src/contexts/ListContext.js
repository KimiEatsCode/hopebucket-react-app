import React, { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorageReceipe";
export const ListContext = createContext();
export const ListAgeContext = createContext();
export const ListContextProvider = (props) => {
  const [list, setList] = useLocalStorage("hopeList", []);
  const [listDate, setListDate] = useLocalStorage("hopeListDate", null);
  const [setIsInitialized] = useState(false);

  useEffect(() => {
    // Get today's date in the format mm/dd/yyyy
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const todayString = mm + "/" + dd + "/" + yyyy;

    // Check if the stored date matches today's date
    if (listDate !== todayString) {
      // New day detected, clear the list
      setList([]);
      setListDate(todayString);
    }
    setIsInitialized(true);
  }, []);

  const copyText = false;
  return (
    <ListContext.Provider value={{ list, setList, copyText }}>
      {props.children}
    </ListContext.Provider>
  );
};
