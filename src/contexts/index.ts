import { AlertProvider } from "./Alert"
import { ThemeProvider } from "./Theme";
import { combineComponents } from "@/utils/combineComponents"

const providers = [
  AlertProvider,
  ThemeProvider
];

const AppContextProvider = combineComponents(...providers);
export default AppContextProvider;