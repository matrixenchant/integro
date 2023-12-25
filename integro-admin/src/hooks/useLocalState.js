import { useEffect, useState } from 'react';

export const useLocalState = (key, init) => {
  const [state, setState] = useState(JSON.parse(localStorage.getItem(key)) || init);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
