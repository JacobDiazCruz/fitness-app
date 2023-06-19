import { createContext, useReducer, useContext, useMemo } from "react";
import themeReducer, { initialState } from "./reducer";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleDarkMode = (val) => {
    dispatch({
      type: "TOGGLE",
      darkMode: val
    })
  };

  // VALUE context prop
  const value = useMemo(() => {
    return {
      toggleDarkMode,
      darkMode: state.darkMode
    }
  }, [
    toggleDarkMode,
    state.darkMode
  ])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within theme context")
  }
  return context;
}

export default useTheme;