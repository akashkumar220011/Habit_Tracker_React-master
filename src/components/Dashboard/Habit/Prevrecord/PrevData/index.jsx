import "./prevData.css";
import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { activeUser, prevBox } from "../../../../../actions";

const PrevData = ({record,index,indexOfHabit}) => {
  console.log("Dates:", record, index);
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.setUserData)


    const handlePrevDayStatus = (value) =>{
      console.log("Data Value", value,index, "---", user.habitData[indexOfHabit]);
      // user.habitData[indexOfHabit].prevRecord[index].status = value;
      let updatedUser = {...user}
      updatedUser.habitData[indexOfHabit].prevRecord[index].status = value;
      dispatch(activeUser(updatedUser));
    }
  return (
    <div className="prevData-container">
      <span
        className="close-box-btn"
        onClick={() => {
          dispatch(prevBox(false));
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </span>

      <h2>{record.date}</h2>

      <div className="selector-container">
        <label htmlFor="antd-select">Status:</label>
        <Select
          id="antd-select"
          defaultValue={record.status}
          onChange={(value)=>{handlePrevDayStatus(value)}}
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

export default PrevData;
