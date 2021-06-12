import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import LoginPage from "../LoginPage/LoginPage";
import Image from './photo-1559523182-a284c3fb7cff.jpg';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

const SignUpPage = ({ currentUser }) => {

  if (currentUser) {
    return <Redirect to='/' />
  }

  return (
    <Fragment>
      <body class="signup-body">
        <div class="w-layout-grid signup-grid"><img src={Image} loading="lazy" id="w-node-_5e39753a-e904-016e-48dd-42a896650524-952f74fd" sizes="100vw" alt="" class="signup-bg-image" />
          <div id="w-node-_5e841677-b4db-76e9-e157-a23cb7f381c8-952f74fd" class="lg-bg-tinter"></div>
          <div id="w-node-_77fe7e06-4be2-a2e8-17f0-7f3aa7b538e0-952f74fd" class="logo-div">
            <div class="logo-text"><span>Time</span><span class="text-span"> Clock </span><span class="text-span-2">App</span></div>
          </div>
          <div id="w-node-_9a11db59-78a2-4430-2251-4576ad6397e3-952f74fd" class="login-banner-text">
            <div class="signup-banner-text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae</div>
            <div class="signup-banner-text-sm">Quo neque error repudiandae fuga Ipsa beori eipsomit</div>
          </div>
          <div id="w-node-_47a55411-0a85-f85d-2819-d300d39f9b78-952f74fd" class="signup-content-div">
            <div class="signup-text-large">Lorem ipsum dolor sit amet consectetur adipisicing elit </div>
            <div class="signup-text-bold">Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas. <br></br>Nulla, placeat.</div>
            <ul role="list" class="login-list">
              <li>First neat feature one</li>
              <li>Neat feature two</li>
              <li>This is a neat feature three</li>
            </ul>
          </div>
          <div id="w-node-_099bd0be-2077-5820-fe86-4bd4de73b8fd-952f74fd" class="signup-formbox-div">
            <div class="signup-text-div">
              <div class="signup-text">SIGN UP TODAY</div>
            </div>
            <SignUpForm />
          </div>
          <div id="w-node-b6f04fef-01c0-4956-3e0f-2ecbfc52e8f2-952f74fd" class="footer-div">dfdf</div>
          <div id="w-node-f758e115-7768-842f-a223-7fb60eb5caff-952f74fd" class="copyright">COPYRIGHT @ EASTERN LAI | NON-PRODUCTION DEMO APP</div>
        </div>
      </body>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(SignUpPage);
