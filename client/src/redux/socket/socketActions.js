import socketTypes from './socketTypes';
import userTypes from '../user/userTypes';
import {connect} from '../../services/socketService'; 

export const connectSocket = () => (dispatch) => {
    const socket = connect();
    dispatch({type: socketTypes.CONNECT, payload: socket});

    socket.on('newPunch', (data) => {
        console.log('test')
        dispatch({type: userTypes.PUNCH_SUCCESS, payload: data})
    });
};