const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch(action.payload) {
        default:
            return state;
    }
};