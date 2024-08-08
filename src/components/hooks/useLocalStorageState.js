import { useEffect, useState } from 'react';

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const getItem = localStorage.getItem(key);
    return getItem ? JSON.parse(getItem) : initialState;
  });

  useEffect(() => {
    if (value.length > 0) localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
