import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorageReceipe";

export const ExpContext = createContext();

export const ExpContextProvider = (props) => {
  const [expDate, setListDate] = useLocalStorage("listDate", "");

  return (
    <ExpContext.Provider value={{ expDate, setListDate }}>
      {props.children}
    </ExpContext.Provider>
  );
};
