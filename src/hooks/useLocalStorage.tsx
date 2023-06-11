import { useEffect, useState } from 'react';

const useLocalStorage = (key) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    setValue(storedValue);
  }, []);

  return value;
};

export default useLocalStorage;