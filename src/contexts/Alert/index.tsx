import { ReactNode, createContext, useReducer, useContext, useMemo } from "react";
import alertReducer, { initialState } from "./reducer";

const AlertContext = createContext();

interface Alert {
  type: string | null;
  title: string | null;
  message: string | null;
};

export const AlertProvider = ({ children } : {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const dispatchAlert = ({ type, title, message }: Alert) => {
    dispatch({
      type,
      payload: {
        title,
        message
      }
    })
  }

  // VALUE context prop
  const value = useMemo(() => {
    return {
      dispatchAlert,
      type: state.type,
      showAlert: state.showAlert,
      title: state.title,
      message: state.message
    }
  }, [
    dispatchAlert,
    state.type,
    state.showAlert,
    state.title,
    state.message
  ])

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error("useAlert must be used within shopcontext")
  }
  return context;
}

export default useAlert;