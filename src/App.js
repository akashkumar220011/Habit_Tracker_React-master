import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Dashboard from "./components/Dashboard";
import WelcomePage from "./components/WelcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { activeUser } from "./actions";

function App() {
  let dispatch = useDispatch();
  // Check User Data from Local Host
  let userData = JSON.parse(localStorage.getItem("user"));

  useState(() => {
    if (userData) {
      dispatch(activeUser(userData));
    }
  }, []);

  const user = useSelector((state) => state.setUserData);
  // Whenever User Gets Updated then update it to Local storage As well

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

  function addDates() {
    const today = new Date();
    let todaysDate = new Date(today);
    todaysDate.setDate(today.getDate());

    let dateToCheck = getFormattedDate(todaysDate).formatted;
    console.log("Date to Check:", dateToCheck);
    // Iterate through each habit in user.habitData
    let newUser = {...user};
    newUser.habitData.forEach((habit) => {
      // Check if any object in habit.prevRecord has a date property matching dateToCheck
      let hasDate = habit.prevRecord.some(
        (record) => record.date === dateToCheck
      );
      if (!hasDate) {
        console.log(
          `The date does not exist in prevRecord for habit ${habit.habitName}. Adding it.`
        );
        let newData = {
          countCompleted: 0,
          status: "None",
          date: getFormattedDate(todaysDate).formatted,
        };
  
        let newRec = [newData, ...habit.prevRecord];
        console.log("New Record!", newRec, "New Data: ", newData);
        habit.prevRecord.pop();
        habit.prevRecord.unshift(newData);
        dispatch(activeUser(newUser))
        localStorage.setItem('user', JSON.stringify(newUser));
      }
    });
  }

  useEffect(() => {
    if (user && user.habitData) {
      addDates();
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Setting User to Local Storage!");
      dispatch(activeUser(user));
    }
  }, [user]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
