import "./createHabit.css";
import waterIcon from "../../../assets/images/drop.png";
import healthIcon from "../../../assets/images/healthcare.png";
import gameIcon from "../../../assets/images/joystick.png";
import workingIcon from '../../../assets/images/working.png';
import sleepIcon from '../../../assets/images/sleep.png';
import exerciseIcon from '../../../assets/images/running.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { activeUser, createBox } from "../../../actions";
import { useState } from "react";

const CreateHabit = () => {
  const dispatch = useDispatch();
  // Fetchin user from Store
  let user = useSelector((state) => state.setUserData);

  const [habitName, setHabitName] = useState("");
  const [habitCount, setHabitCount] = useState(0);
  const [habitIcon, setHabitIcon] = useState(sleepIcon)

  // Dates
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

  //   Handling Form Submission
  const handleFormSubmission = (e) => {
    e.preventDefault();
    dispatch(createBox(false))
    console.log("Form Submitted!", habitName, habitCount);
    console.log("User", user);
    // Setting created Havit top localStorage as well as to the store
    let habitData = [];
    if (user.habitData) {
      habitData = [...user.habitData];
    }
    // Id of Each Habit
    let id = Date.now();
    let countCompleted = 0;
    let prevRecord = [];
    for (let i = 0; i < 7; i++) {
      const previousDate = new Date(today);
      previousDate.setDate(today.getDate() - i);
      prevRecord.push({ countCompleted: 0, status: "None", date:getFormattedDate(previousDate).formatted });
    }

    habitData.push({ id, habitName, habitCount, habitIcon, countCompleted, prevRecord });
    let updatedUser = { ...user };
    updatedUser.habitData = habitData;

    localStorage.setItem("user", JSON.stringify(updatedUser));
    dispatch(activeUser(updatedUser));
    console.log("Updated User:", updatedUser);
  };
  return (
    <div className="create-box-habit-background">

      <div className="create-habit-container">
        <h1 className="container-heading">Create Habit</h1>

        {/* Close Box Btn */}
        <span
          className="close-box-btn"
          onClick={() => {
            dispatch(createBox(false));
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </span>

        <form
          action=""
          className="create-habit-form"
          onSubmit={handleFormSubmission}
        >
          <div className="form-field">
            <label htmlFor="habit-name">Habit Name:</label>
            <input
              type="text"
              id="habit-name"
              required
              onChange={(e) => {
                setHabitName(e.target.value);
              }}
            />
          </div>

          <div className="form-field">
            <label htmlFor="habit-count">Habit Count:</label>
            <input
              type="Number"
              min={0}
              id="habit-count"
              defaultValue={0}
              required
              onChange={(e) => {
                setHabitCount(e.target.value);
              }}
            />
          </div>

          <div className="form-field1">

            <label htmlFor="">Select Icon: </label>
            <div className="icons-selector">
              <div className="icon" onClick={() => { setHabitIcon(gameIcon) }}>
                <img src={gameIcon} alt="" />
              </div>

              <div className="icon" onClick={() => { setHabitIcon(healthIcon) }}>
                <img src={healthIcon} alt="" />
              </div>

              <div className="icon" onClick={() => { setHabitIcon(waterIcon) }}>
                <img src={waterIcon} alt="" />
              </div>

              <div className="icon" onClick={() => { setHabitIcon(exerciseIcon) }}>
                <img src={exerciseIcon} alt="" />
              </div>

              <div className="icon" onClick={() => { setHabitIcon(workingIcon) }}>
                <img src={workingIcon} alt="" />
              </div>

              <div className="icon" onClick={() => { setHabitIcon(sleepIcon) }}>
                <img src={sleepIcon} alt="" />
              </div>
              {/* <img className="icon" src="" alt="" />
                <img className="icon" src="" alt="" />
                <img className="icon" src="" alt="" />
                <img className="icon" src="" alt="" /> */}
            </div>
          </div>

          <button className="create-box-btn" type="submit">
            Create Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHabit;
