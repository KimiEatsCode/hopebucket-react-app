import { createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorageReceipe";
import { DEFAULT_VALUES, MAX_CUSTOM_VALUES, VALUE_CHAR_LIMIT } from "../constants/values";

export const ValuesContext = createContext();

export function ValuesContextProvider({ children }) {
  const [customValues, setCustomValues] = useLocalStorage("personalValues", []);

  const values = useMemo(
    () => [...DEFAULT_VALUES, ...customValues],
    [customValues]
  );

  const addValue = (text) => {
    if (customValues.length >= MAX_CUSTOM_VALUES) return false;
    const trimmed = text.trim().slice(0, VALUE_CHAR_LIMIT);
    if (!trimmed) return false;
    const duplicate = values.some(
      (v) => v.text.toLowerCase() === trimmed.toLowerCase()
    );
    if (duplicate) return false;
    setCustomValues([...customValues, { id: Date.now(), text: trimmed }]);
    return true;
  };

  const removeValue = (id) => {
    setCustomValues(customValues.filter((v) => v.id !== id));
  };

  const getValueById = (id) => {
    if (id == null || id === "") return null;
    return values.find((v) => String(v.id) === String(id)) ?? null;
  };

  return (
    <ValuesContext.Provider
      value={{ values, customValues, addValue, removeValue, getValueById }}
    >
      {children}
    </ValuesContext.Provider>
  );
}
