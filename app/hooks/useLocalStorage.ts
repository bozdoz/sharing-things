import { useEffect, useState } from "react";

type JSONValue = string | undefined;

const useLocalStorage = <T extends JSONValue>(
  key: string,
  initialValue: T = undefined as T
): [T, (a: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>();

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

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue as T, setValue];
};

export default useLocalStorage;
