/**
 * Util Function to reset a piece of state
 * @param {object} state - State object 
 * @param {*} setState - Function to reset state
 * @returns {object} - The new value of state after setState call
 */
export const resetState = (state, setState, setInvalid) => {
    const keys = Object.keys(state);
    const temp = { ...state };
    keys.forEach(x => {
        if (Array.isArray(x)) {
            temp[x] = [];
        }
        else {
            temp[x] = '';
        }
    });
    setState(temp);
    if (setInvalid) {
        setInvalid([]);
    }
    return temp;
};