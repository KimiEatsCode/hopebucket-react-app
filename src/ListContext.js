import React, { createContext } from "react";
import { useLocalStorage } from "./hooks/useLocalStorageReceipe";
import Cookies from 'js-cookie';

export const Context = createContext();

function clearCookiesForNextDay() {
  const cookies = Cookies.get();

  for (const cookieName in cookies) {
    const cookie = Cookies.get(cookieName);
    if (cookie) {
      // Set the cookie to expire at the end of the current day
      const expirationDate = new Date();
      expirationDate.setHours(23, 59, 59, 999);
      Cookies.set(cookieName, cookie, { expires: expirationDate });
    }
  }
}

// clearCookiesForNextDay();

function clearCookiesForNextMinute() {
  const cookies = Cookies.get();

  for (const cookieName in cookies) {
    Cookies.remove(cookieName, { path: '/' }); // Set the path to clear cookies across the entire domain
  }
}

clearCookiesForNextMinute()

function ListContext({ children }) {
  const [list, setList] = useLocalStorage("hopeList", []);

  return (
    <Context.Provider value={{ list, setList }}>{children}</Context.Provider>
  );
}

export default ListContext;
