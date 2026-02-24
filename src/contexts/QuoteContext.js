import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorageReceipe";

export const QuoteContext = createContext();

export function QuoteContextProvider({ children }) {
  const [quotes, setQuotes] = useLocalStorage("customQuotes", []);

  const addQuote = (text) => {
    if (quotes.length >= 3) return false;
    const trimmed = text.trim().slice(0, 140);
    if (!trimmed) return false;
    setQuotes([...quotes, { id: Date.now(), text: trimmed }]);
    return true;
  };

  const removeQuote = (id) => {
    setQuotes(quotes.filter((q) => q.id !== id));
  };

  return (
    <QuoteContext.Provider value={{ quotes, addQuote, removeQuote }}>
      {children}
    </QuoteContext.Provider>
  );
}
