'use client';

import { AlertProvider } from "./Alert"
import { ThemeProvider } from "./Theme";
import { combineComponents } from "@/utils/combineComponents"
import { NotificationProvider } from "./Notification/useNotification";

const providers = [
  AlertProvider,
  ThemeProvider,
  NotificationProvider
];

const AppContextProvider = combineComponents(...providers);
export default AppContextProvider;