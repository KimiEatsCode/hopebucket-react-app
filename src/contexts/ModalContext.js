import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = (props) => {
  const [showListModal, setShowListModal] = useState(false);

  return (
    <ModalContext.Provider value={{ showListModal, setShowListModal }}>
      {props.children}
    </ModalContext.Provider>
  );
};
