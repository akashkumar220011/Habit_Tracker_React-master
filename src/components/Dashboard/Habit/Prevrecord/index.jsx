import { useDispatch, useSelector } from "react-redux";
import PrevData from "./PrevData";
import "./prevRecord.css";
import { useEffect } from "react";
import { activeUser, prevBox } from "../../../../actions";
// import activeHabitPrevData from "../../../../reducers/activeHabit";

const PrevRecord = () => {
  let user = useSelector((state) => state.setUserData);
  let dispatch = useDispatch()
  const activeHabitData = useSelector((state) => state.activeHabitPrevData);
  useEffect(() => {
    console.log("Habit Data Active*************:", activeHabitData);
  }, [activeHabitData])
  // Calculating Date
  function getFormattedDate(date) {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const ordinalIndicator = getOrdinalIndicator(day);

    return {
      dayOfWeek: dayOfWeek,
      day: day,
      month: month,
      year: year,
      formatted: `${dayOfWeek}, ${day}${ordinalIndicator} ${month}, ${year}`,
    };
  }

  function getOrdinalIndicator(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  const today = new Date();

  // Get the previous 10 days
  const previousDates = [];
  for (let i = 6; i > 0; i--) {
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - i);
    previousDates.unshift(getFormattedDate(previousDate));
  }



  // For deletion

  const deleteHabit = () => {
    let updatedData = user.habitData.filter((habit) => habit.id !== activeHabitData[0].id)
    let updatedUser = { ...user }
    updatedUser.habitData = updatedData;
    console.log("Updated USer:", updatedUser);
    dispatch(activeUser(updatedUser))
    localStorage.setItem('user', JSON.stringify(updatedUser))
    dispatch(prevBox(false))
  }
const indexOfHabit = user.habitData.findIndex(habit => habit.id === activeHabitData[0].id);

  return (
    <div className="prevRecord-background">
      <div className="prevRecord-container">
        <h1>{activeHabitData[0].habitName}</h1>

        <h3>Previous Records</h3>
        <div className="previous-record-list">
          {/* Import Previous Data Icons */}
          {user.habitData[indexOfHabit].prevRecord.map((record, index) => (
            index > 0 && (
              <PrevData record={record} key={index} index={index} indexOfHabit={indexOfHabit} />
            )
          ))}

        </div>

        <button className="delete-habit-btn" onClick={deleteHabit}>Delete habit</button>
      </div>
    </div>
  );
};

export default PrevRecord;
