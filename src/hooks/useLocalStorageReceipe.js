import { useState } from "react";

// Hook
export  function useLocalStorage(key, initialValue) {
  
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
     
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      if(error) {
        alert("Your browser does not support local storage. Your hope list will not be saved.");
      }
      console.log(error);
    }
  };
  return [storedValue, setValue];
}