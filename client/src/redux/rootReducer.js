import {combineReducers} from 'redux';
import timeCardReducer from './timeCard/timeCardReducer';
import userReducer from './user/userReducer';
import socketReducer from './socket/socketReducer';


const rootReducer = combineReducers({
    user: userReducer,
    timeCard: timeCardReducer,
    socket: socketReducer,
});

export default rootReducer;