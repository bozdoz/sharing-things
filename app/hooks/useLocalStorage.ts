import { useEffect, useState } from "react";

type JSONValue = string | undefined;

const useLocalStorage = (
  key: string,
  initialValue: JSONValue = undefined
): [JSONValue, (a: JSONValue) => void] => {
  const [storedValue, setStoredValue] = useState<JSONValue>();

  // using useEffect to avoid next's server-side render
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.log(error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue, storedValue]);

  const setValue = (value: JSONValue) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
