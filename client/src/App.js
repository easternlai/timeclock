import React, {Fragment, useEffect, useRef} from 'react';
import {Switch, Route, useHistory, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import './styles/css/normalize.css';
import './styles/css/webflow.css';
import './styles/css/es-fabulous-project-2b98b1.webflow.css';
import './styles/css/mystyles.css';

import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import HomePage from './pages/HomePage/HomePage';
import PrivateRoute from './components/Routing/ProtectedRoute';
import TimeSheet from './pages/TimeSheet/TimeSheet';
import {loginStart} from './redux/user/userActions';
import { connectSocket} from './redux/socket/socketActions';

export function App({loginStart, connectSocket, userToken }) {

 const token = localStorage.getItem('token');
  useEffect( () => {
    if(token){
      loginStart(null, null, token);
    }
    if(userToken){
      connectSocket();
    }

  },[loginStart, connectSocket, token, userToken]);

  return (
  
    <div className="App">
      <Switch>
        <Route path='/login' component={LoginPage}/>
        <Route path='/signup' component={SignUpPage}/>
        <PrivateRoute exact path='/' component={HomePage} />
        <PrivateRoute  path='/timesheet' component={TimeSheet} />
  
      </Switch>
      
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.user.token
});

const mapDispatchToProps = (dispatch) => ({
  loginStart: (usernameOrEmail, password, token) => dispatch(loginStart(usernameOrEmail, password, token)),
  connectSocket: () => dispatch(connectSocket())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
