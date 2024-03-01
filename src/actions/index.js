// Setting User 
export const activeUser = (user)=>{
    return{
        type: "SET_USER",
        payload: user
    }
}

// export Create Box 

export const createBox = (val)=>{
    return{
        type: "HANDLE_CREATE_BOX",
        payload: val
    }
}


// Prev Record Box

export const prevBox = (val)=>{
    return{
        type: "HANDLE_PREV_BOX",
        payload: val
    }
}

// active clicked habit

export const activeHabitData = (val)=>{
    return{
        type: "SET_ACTIVE_HABIT_DATA",
        payload: val
    }
}