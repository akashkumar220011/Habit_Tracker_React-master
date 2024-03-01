import { combineReducers } from "redux";
import setUserData from "./user.js";
import handleCreateBox from "./createBox.js";
import handlePrevBox from "./prevBox.js";
import activeHabitPrevData from "./activeHabit.js";
const rootReducer = combineReducers({
    // Sending All the Reducers from here
    setUserData,
    handleCreateBox,
    handlePrevBox,
    activeHabitPrevData
})

export default rootReducer;