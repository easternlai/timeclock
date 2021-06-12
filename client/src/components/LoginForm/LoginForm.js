import React, { Fragment, useState } from "react";
import {connect} from 'react-redux';
import {loginStart} from "../../redux/user/userActions";

const LoginForm = ({loginStart, error}) => {
  const [usernameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    loginStart(usernameOrEmail,password);
  };

  return (
    <div class="login-form-block w-form">
      <form
        id="email-form"
        name="email-form"
        data-name="Email Form"
        class="form"
        onSubmit={handleSubmit}
      >
        <label for="name" class="field-label">
          Username or Email Address
        </label>
        <input
          type="text"
          class="text-field w-input"
          maxlength="256"
          name="name-5"
          data-name="Name 5"
          placeholder=""
          id="name-5"
          onChange={(e)=>setUserNameOrEmail(e.target.value)}
        />
        <label for="name" class="field-label">
          Password
        </label>
        <input
          type="password"
          class="text-field w-input"
          maxlength="256"
          name="name-3"
          data-name="Name 3"
          placeholder=""
          id="name-3"
          onChange={(e)=> setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Submit"
          data-wait="Please wait..."
          class="submit-button w-button"
        />
      </form>
      <div style={{'margin-top':'10px'}}>
      <a href="/signup">Don't have an account?</a>
      </div>
      {error && (
        <p class="error field-label">{error}</p>
      )}
    </div>
    
  );
};

const mapStateToProps = (state) => ({
  error: state.user.error
})

const mapDispatchToProps = (dispatch)=>({
    loginStart: (usernameOrEmail, password)=>(dispatch(loginStart(usernameOrEmail, password)))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
