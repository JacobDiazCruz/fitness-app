export const initialState = {
  selectedExercises: [],
  workoutName: "",
  workoutDescription: ""
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