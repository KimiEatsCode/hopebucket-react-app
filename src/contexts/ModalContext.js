import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = (props) => {
  const [showListModal, setShowListModal] = useState(false);
  const [showAddField, setShowAddField] = useState(false);

  return (
    <ModalContext.Provider value={{ showListModal, setShowListModal, showAddField, setShowAddField }}>
      {props.children}
    </ModalContext.Provider>
  );
};
