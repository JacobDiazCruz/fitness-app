import { AlertProvider } from "./Alert"
import { combineComponents } from "@/utils/combineComponents"

const providers = [
  AlertProvider
];

const AppContextProvider = combineComponents(...providers);
export default AppContextProvider;