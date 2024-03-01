import { useEffect, useState } from "react";
import welcomePng from "../../assets/images/welcomePng.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';
import "./welcomePage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../../actions";

const WelcomePage = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let existingUser = useSelector((state)=>state.setUserData)
    // let existingUser = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {
        if (existingUser) {
            console.log("User already Exists");
            navigate("/user/dashboard");
        }
    }, [existingUser]);

    let [userNameBox, setUserNameBox] = useState(false);

    let [userGenderBox, setUserGenderBox] = useState(false);

    const [user, setUser] = useState({
        name: "",
        gender: "",
        
    });

    // Validating User Name
    const validateName = (e) => {
        console.log("VAlue:", e.target.value);
        if (e.target.value == "") {
            console.log("User Name Cannot Be Empty!");
            return;
        }
        setUser({
            ...user,
            name: e.target.value,
        });
    };

    // Validating Gender
    const validateGender = (e) => {
        console.log("Gender:", e.target.value);
        if (e.target.value == "") {
            console.log("User Gender Cannot Be Empty!");
            return;
        }
        setUser({
            ...user,
            gender: e.target.value,
        });

        // setUserGenderBox(false);
    };
// Setting User to localhost
    const setUsertoLocalHost = () => {
        if (user.name !== "" || user.gender !== "") {
            localStorage.setItem("user", JSON.stringify(user));
            // Setting Active User in Store
            dispatch(activeUser(user))
            navigate("/user/dashboard");
            return;
        }
        console.log("Fill Details To Push!");
    };

    return (
        <div className="welcome-page-container">
            <h1 className="welcome-header">Welcome to Habit Tracker!</h1>
            <img src={welcomePng} alt="" className="welcome-png" />
            <h3 className="welcome-quote">
                Step into a Better You with Our Habit Tracker!
            </h3>
            <button
                className="letsBegin-btn"
                onClick={() => {
                    setUserNameBox(true);
                }}
            >
                Let's Begin! 🚀
            </button>

            {userNameBox && (
                <div className="userName-box-back">
                    <div className="user-name-container">
                        {/* <span className='close-container'>
    
            <FontAwesomeIcon icon={faXmark} />
                </span> */}
                        <h2>Before We Start! How Shall we Call You...</h2>
                        <input
                            type="text"
                            className="user-name"
                            placeholder="Please Enter Your Name!"
                            onChange={validateName}
                        />

                        <button
                            className="save-details-btn"
                            onClick={() => {
                                if (user.name !== "") {
                                    setUserNameBox(false);
                                    setUserGenderBox(true);
                                }
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            {userGenderBox && (
                <div className="user-gender-back">
                    <div className="user-gender-container">
                        <h2>Hey {user.name}!</h2>
                        <h3>
                            To tailor your experience,,
                            <br /> could you let us know your gender?
                        </h3>
                        <select
                            className="user-gender-select"
                            onChange={validateGender}
                            placeholder="Gender"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>

                        <button
                            className="save-details-btn"
                            onClick={() => {
                                if (user.gender !== "") {
                                    setUserGenderBox(false);
                                    setUsertoLocalHost();
                                }
                            }}
                        >
                            Let's Go!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WelcomePage;
