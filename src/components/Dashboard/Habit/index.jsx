import "./habit.css";
// import waterIcon from "../../../assets/images/drop.png";
// import healthIcon from "../../../assets/images/healthcare.png";
// import gameIcon from "../../../assets/images/joystick.png";
// import workingIcon from '../../../assets/images/working.png';
// import sleepIcon from '../../../assets/images/sleep.png';
// import exerciseIcon from '../../../assets/images/running.png'

import React, { useEffect, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Progress, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { activeHabitData, activeUser, prevBox } from "../../../actions";

const Habit = ({ habit, index }) => {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.setUserData);
  console.log("USer From Habit:", user, "Habit Recieved:", habit,index);
  //   // States for Count and Status
  const [percent, setPercent] = useState(0);
  const [completedCount, setCompletedCount] = useState(habit.prevRecord[0].countCompleted);
  const [statusChange, setStatusChange] = useState(habit.prevRecord[0].status)

  // Handling ProgressBar
  const increase = () => {
    if (habit.habitCount === 0) {
      setStatusChange("Done");
      setPercent(100);
      return;
    }

    setCompletedCount((prevCount) => {
      let newCount = prevCount + 1;
      if (newCount >= habit.habitCount) {
        setStatusChange("Done");
        setPercent(100);
        return habit.habitCount;
      }
      let newPercent = ((newCount / habit.habitCount) * 100).toFixed(2);
      setStatusChange("Not Done");
      setPercent(newPercent);
      return newCount;
    });
  };

  const decline = () => {
    // If there is no habit count then return
    if (habit.habitCount === 0) {
      setStatusChange("None");
      setPercent(0);
      return;
    }
    setCompletedCount((prevCount) => {
  
      const newCount = prevCount - 1;
      if(newCount <= 0){
        setPercent(0)
        setStatusChange("None")
        return 0;
      }
      
      const newPercent = ((newCount / habit.habitCount) * 100).toFixed(2);
      setPercent(newPercent);
      setStatusChange("Not Done");
      return newCount;
    });
  };

  // states for previous record data

  const showRecord = (id) => {
    console.log("Show Record of!", id);
    dispatch(prevBox(true))

    let habitData = user.habitData.filter((habit) => habit.id === id);
    console.log("Habit data:", habitData);

    dispatch(activeHabitData(habitData))
  }

  const handleStatusChange = (val) => {
    console.log("Statuc Changed:", val);
    if(val === "Done"){
      setPercent(100);
      setCompletedCount(habit.habitCount);
      setStatusChange("Done");
    }else if(val === "None"){
      setPercent(0);
      setCompletedCount(habit.habitCount);
      setStatusChange("None");
    }else{
      setStatusChange("Not Done")
    }
  }

  useEffect(()=>{
    if(user){
      let updatedUser = {...user}
      updatedUser.habitData[index].prevRecord[0].status = statusChange;
      updatedUser.habitData[index].prevRecord[0].countCompleted = completedCount;

      dispatch(activeUser(updatedUser));
      // localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  },[statusChange],[completedCount])


  // on page refresh
  useEffect(() => {
    if (habit.prevRecord[0].status === "Done" || (habit.habitCount === habit.prevRecord[0].countCompleted && habit.habitCount > 0)) {
      setPercent(100);
      setCompletedCount(habit.habitCount);
      setStatusChange("Done")
    } else if (habit.prevRecord[0].countCompleted > 0 && habit.habitCount !== habit.prevRecord[0].countCompleted) {
      setPercent(((habit.prevRecord[0].countCompleted / habit.habitCount)*100).toFixed(2));
      
      setStatusChange("Not Done")
    } else {
      setPercent(0);
      setCompletedCount(0)
      setStatusChange("None")

    }
  }, [])



  return (
    <div className="habit-container">
      <div className="habit-upperBody" onClick={() => { showRecord(habit.id) }}>
        <div className="header">
          {/* Image According to habit */}
          <div className="habit-image">
            <img src={habit.habitIcon} alt="" />
          </div>
          <h4 className="habit-name">{habit.habitName}</h4>
        </div>

        <div className="graph">
          <Progress type="circle" percent={percent} />
        </div>
      </div>

      <div className="habit-btns">
        <button className="dec-count" onClick={decline}>
          <MinusOutlined />
        </button>
        <button className="inc-count" onClick={increase}>
          <PlusOutlined />
        </button>
      </div>

      <div className="select-completition">
        <Select
          className="antd-select-tag"
          defaultValue={statusChange}
          onChange={(value) => { handleStatusChange(value) }}
          options={[
            { value: "Done", label: "Done" },
            { value: "Not Done", label: "Not Done" },
            { value: "None", label: "None" },
          ]}
        />
      </div>
    </div>
  );
};

export default Habit;
