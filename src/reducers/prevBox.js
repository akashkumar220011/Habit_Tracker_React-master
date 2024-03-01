let initialState = false;

const handlePrevBox = (state = initialState, action)=>{
console.log("From Prev box");
    switch (action.type) {
        case "HANDLE_PREV_BOX":
                console.log("Change Box val:", action.payload);
            return action.payload
    
        default:
                console.log("Change Box Default:", state);
            return state;
    }
}

export default handlePrevBox;