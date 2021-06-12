import React from 'react'
import {Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({children, currentUser, ...props}) => {

    return (
        <Route {...props}>{currentUser ? children : <Redirect to='/login'/>}</Route>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(ProtectedRoute);
