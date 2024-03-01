let initialState = false;

const handleCreateBox = (state = initialState, action) =>{

    switch (action.type) {
        case "HANDLE_CREATE_BOX":
            return action.payload;
        default:
            return state;
    }
}

export default handleCreateBox;
 
