let initialState = null;

const activeHabitPrevData = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_HABIT_DATA":
        console.log("from Red:", action.payload);
      return action.payload;

    default:
      return state;
  }
};

export default activeHabitPrevData;
