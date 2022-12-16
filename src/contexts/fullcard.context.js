import { createContext, useEffect, useState } from "react";

export const FullCardContext = createContext();

export const FullCardProvider = ({ children }) => {
  const [fullCard, setFullCard] = useState(false);
  const [fullCardComponent, setFullCardComponent] = useState(null);
  useEffect(() => {
    if (!fullCard) {
      setFullCardComponent(null);
    }
  }, [fullCard]);
  return (
    <FullCardContext.Provider
      value={{
        fullCard,
        setFullCard,
        fullCardComponent,
        setFullCardComponent,
      }}
    >
      {children}
    </FullCardContext.Provider>
  );
};
