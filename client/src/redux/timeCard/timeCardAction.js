import timeCardTypes from './timeCardTypes';
import {getTimeCard} from '../../services/TimeCardServices';

export const getMyTimeCard = () => async (dispatch) => {
    const token = localStorage.getItem('token');

    dispatch({type: timeCardTypes.GET_TIMECARD_START});
    const res = await getTimeCard(token);
    dispatch({type: timeCardTypes.GET_TIMECARD_SUCCESS, payload: res})

}