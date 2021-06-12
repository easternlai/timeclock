import React from "react";
import {connect} from 'react-redux';
import {signout} from '../../redux/user/userActions';

const Header = ({signout, firstInitial}) => {

const handleClick = () => {
  signout();
}

  return (
    <div class="div-block-14">
      <div class="logout-div">
        <a href="#" class="button-3 w-button" onClick={handleClick}>
          {firstInitial}
        </a>
      </div>
      <div class="logo-div">
        <div class="logo-text">
          <span class="text-span-3">Time</span>
          <span class="text-span"> Clock </span>
          <span class="text-span-2">App</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  firstInitial: state.user.currentUser.fullName[0].toLowerCase()
});

const mapDispatchToProps = (dispatch) => ({
  signout: ()=> dispatch(signout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
