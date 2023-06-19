import { AlertProvider } from "./Alert"
import { combineComponents } from "@/utils/combineComponents"
import { ThemeProvider } from "./Theme";

const providers = [
  AlertProvider,
  ThemeProvider
];

const AppContextProvider = combineComponents(...providers);
export default AppContextProvider;