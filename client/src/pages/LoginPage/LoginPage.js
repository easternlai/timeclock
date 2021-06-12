import React, { Fragment, useEffect } from "react";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import LoginForm from "../../components/LoginForm/LoginForm";
//import

const LoginPage = ({currentUser}) => {


  //could not put Redirect in use effect.  If this creates issues we should 
  if(currentUser) return <Redirect to='/'/>

  return (
    <Fragment>
      <body class="login-body">
        <div class="login-div">
          <div class="logo-text">
            <span>Time</span>
            <span class="text-span"> Clock </span>
            <span class="text-span-2">App</span>
          </div>
          <div class="text-block-11">Welcome to TimeClockApp</div>
          <LoginForm />
        </div>
        <script
          src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=606d42f2048a8603f42f74fc"
          type="text/javascript"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossorigin="anonymous"
        ></script>
        <script src="js/webflow.js" type="text/javascript"></script>
      </body>
    </Fragment>
  );
};

const mapStateToProps = (state) =>({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps, null)(LoginPage);
