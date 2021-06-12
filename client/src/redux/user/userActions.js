import userTypes from './userTypes';
import {loginAuthentication, register} from '../../services/authServices';
import {clockEntry} from '../../services/TimeCardServices';

export const loadUser = ({user, token}) => {
    //set token
    localStorage.setItem('token', token);
    
    return ({type: userTypes.LOGIN_SUCCESS, payload: {user, token} })
    
};


export const signout = () => dispatch=>{
    {
    localStorage.removeItem('token');
    dispatch({type: userTypes.SIGN_OUT});
}}

export const signInFailure = (err) => ({
    type: userTypes.SIGN_IN_FAILURE,
    payload: err
})


export const loginStart = (usernameOrEmail, password, token) => async (dispatch) => {
    try {

        const res = await loginAuthentication(usernameOrEmail, password, token);

        dispatch(loadUser(res));
    } catch (err) {
        dispatch(signInFailure(err.message));
        dispatch(signout);
    }
}

export const registerStart = (fullName, email, username, password) => async(dispatch) =>{

    try {
        // post user from services with four fields
        const res = await register(fullName, email, username, password);

        dispatch(loadUser(res));
    } catch (err) {
        dispatch(signInFailure(err.message));
        dispatch(signout);
    }
}


export const clockPush = (isClockedIn) => async dispatch=> {
    {
        const token = localStorage.getItem('token');
        clockEntry(token);
        dispatch({type: userTypes.PUNCH_SUCCESS, payload: !isClockedIn})
    }
}