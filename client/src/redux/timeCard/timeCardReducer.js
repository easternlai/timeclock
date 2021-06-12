import timeCardTypes from './timeCardTypes';

const INITIAL_STATE = {
    entries: null, 
    fetching: true
}

const timeCardReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case timeCardTypes.GET_TIMECARD_START:{
            return {
                ...state,
                fetching: true
            }
        }

        case timeCardTypes.GET_TIMECARD_SUCCESS:{
            return {
                ...state,
                fetching: false,
                entries: action.payload
            }
        }

        default: return state
    }
}

export default timeCardReducer;