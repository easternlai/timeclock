import userTypes from './userTypes';

const INITIAL_STATE = {
    currentUser: null,
    error: false,
    token: localStorage.getItem('token'),

}

const userReducer = (state=INITIAL_STATE, action)=>{
    switch(action.type){

        case userTypes.LOGIN_SUCCESS:
            return {
                ...state,
                error: false,
                currentUser: action.payload.user,
                token: action.payload.token,

            }

        case userTypes.SIGN_IN_FAILURE:
        case userTypes.SIGN_UP_FAILURE: {
            return {
                ...state,
                error: action.payload
            }
        }

        case userTypes.PUNCH_SUCCESS:
            return {
                ...state,
                currentUser: {...state.currentUser, isClockedIn: action.payload }
            }

        case userTypes.SIGN_OUT:
            return {
                ...state,
                error: false, 
                currentUser: null,
                token: null,
            }


        default:
            return state;
    }

}

export default userReducer;