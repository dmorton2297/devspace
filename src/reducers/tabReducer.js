import { SET_TAB } from '../actions/tabActions';

const tabReducer = (tab = 'space', action) => {
    switch(action.type) {
        case SET_TAB:
            return action.payload;
        default:
            return tab
    };
};

export default tabReducer;
