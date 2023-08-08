'use client';

export const initialState = {
  darkMode: true
}
  
const ThemeReducer = (state, action) => {
  const { type, darkMode } = action;
  switch (type) {
    case "TOGGLE":
      return {
        ...state,
        darkMode: state.darkMode = !state.darkMode
      }
    default:
      throw new Error('No case type found')
  }
}

export default ThemeReducer;