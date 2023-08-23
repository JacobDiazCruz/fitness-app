"use client";

import { editNotifOrderStatus, listNotifications } from "@/api/Notification";
import { ResponseError } from "@/utils/types";
import { createContext, useContext, useMemo, ReactNode, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import useAlert from "../Alert";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { dispatchAlert }: any = useAlert();

  const [showNotification, setShowNotification] = useState<boolean>(false);

  // list coaching plans
  const {
    data: notifications,
    refetch: refetchNotifications
  } = useQuery('notifications', () => listNotifications(), {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  const editNotifOrderStatusMutation = useMutation(editNotifOrderStatus, {
    onError: (err: ResponseError) => {
      dispatchAlert({
        type: "ERROR",
        message: err.message
      })
    }
  });

  // value prop to return all necessary data
  const value = useMemo(() => {
    return {
      notifications,
      refetchNotifications,
      editNotifOrderStatusMutation,
      showNotification,
      setShowNotification
    }
  }, [
    notifications,
    refetchNotifications,
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