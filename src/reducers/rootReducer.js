// Initial State of the applciation
const initialState = {
    user: {
        name: 'Dan Morton'
    }
};

/**
 * 
 * @param {object} state - State object 
 * @param {object} action - Action to perform on state.
 */
const rootReducer = (state = initialState, action) => {
    return state;
};

export default rootReducer;