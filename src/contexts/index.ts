import { AlertProvider } from "./Alert"
import { WorkoutProvider } from "./Workout";
import { ThemeProvider } from "./Theme";
import { combineComponents } from "@/utils/combineComponents"

const providers = [
  AlertProvider,
  ThemeProvider,
  WorkoutProvider
];

const AppContextProvider = combineComponents(...providers);
export default AppContextProvider;