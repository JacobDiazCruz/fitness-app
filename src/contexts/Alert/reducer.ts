'use client';

export const initialState = {
  showAlert: false,
  title: "",
  message: "",
  type: "",
  action: "close"
}

const AlertReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SUCCESS":
      return {
        ...state,
        showAlert: state.showAlert = true,
        title: state.title = state.title,
        message: state.message = payload.message,
        type: state.type = "SUCCESS"
      }
    case "ERROR":
      return {
        ...state,
        showAlert: state.showAlert = true,
        title: state.title = state.title,
        message: state.message = payload.message,
        type: state.type = "ERROR"
      }
    case "REMOVE":
      return {
        ...state,
        showAlert: state.showAlert = false,
        title: state.title = "",
        message: state.message = "",
        type: state.type = ""
      }
    default:
      throw new Error('No case type found')
  }
}

export default AlertReducer;