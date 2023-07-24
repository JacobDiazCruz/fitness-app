'use client';

import { createContext, useContext, useMemo, ReactNode, useState } from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {

  const [showNotification, setShowNotification] = useState<boolean>(false);

  // value prop to return all necessary data
  const value = useMemo(() => {
    return {
      showNotification,
      setShowNotification
    }
  }, [
    showNotification,
    setShowNotification
  ]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within NotificationContext")
  }
  return context;
};

export default useNotification;