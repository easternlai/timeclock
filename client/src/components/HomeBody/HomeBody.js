import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import PunchButton from '../PunchButton/PunchButton';
import Loader from '../Loader/Loader';


import {clockPush} from '../../redux/user/userActions';

const HomeBody = ({currentUser, clockPush}) => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timeInterval = setInterval(()=> 
        {
            setCurrentTime(moment().format('h[:]mm[:]ss[ ]a'));
            
        }, 1000);
        return () => {
             clearInterval(timeInterval);
        }
    }, [setInterval]);

    const handleClick = (e)=>{
        clockPush(currentUser.isClockedIn)
    }

    return (
        <div class="w-layout-grid grid-4">
        <div id="w-node-_8977813f-d2c3-296e-3dd8-24fd1755b90c-5ff62d21" class="text-block-12">{currentTime}</div>
        {currentTime ? (<div id="w-node-_58b125db-93fd-508d-c3c0-d10fe75dc77e-5ff62d21" class="div-block-17">
            <PunchButton onClick={handleClick} clockedIn={currentUser.isClockedIn}>{currentUser.isClockedIn?'Clock Out':'Clocked In'}</PunchButton>
            
        </div>):<Loader />}
    </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    clockPush: (isClockedIn) => dispatch(clockPush(isClockedIn)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeBody);
