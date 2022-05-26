import { useEffect, useState } from 'react';

export const useDOMContentLoaded = () => {
  const [isDOMContentLoaded, setDOMContentLoaded] = useState(false);
  useEffect(() => {
    setDOMContentLoaded(true);
  }, []);

  return isDOMContentLoaded;
};
