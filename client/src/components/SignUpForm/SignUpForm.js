import React, { Fragment, useState } from "react";
import {connect} from 'react-redux';
import {registerStart} from '../../redux/user/userActions';


const SignUpForm = ({registerStart, error}) => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    registerStart(fullName, email, username, password);
    
  }
  return (
    <Fragment>
      <div class="signup-form-block w-form">
        <form
          id="email-form"
          name="email-form"
          data-name="Email Form"
          class="form"
          onSubmit={handleSubmit}
        >
          <label for="name" class="field-label">
            Name
          </label>
          <input
            type="text"
            class="text-field w-input"
            maxlength="256"
            name="name"
            data-name="Name"
            placeholder=""
            id="name"
            onChange={(e)=> setFullName(e.target.value)}

          />
          <label for="name-2" class="field-label">
            Email
          </label>
          <input
            type="text"
            class="text-field w-input"
            maxlength="256"
            name="name-5"
            data-name="Name 5"
            placeholder=""
            id="name-5"
            onChange={(e)=> setEmail(e.target.value)}
          />
          <label for="name-2" class="field-label">
            Username
          </label>
          <input
            type="text"
            class="text-field w-input"
            maxlength="256"
            name="name-4"
            data-name="Name 4"
            placeholder=""
            id="name-4"
            onChange={(e)=> setUsername(e.target.value)}
          />
          <label for="name-2" class="field-label">
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
          <div>
            Please be sure to signup with a password unique to this website.
            Although passwords on this site are encrypted by bcryptjs, this
            application was developed for educational purposes and therefore was
            will not be maintained to the standard of other SaaS applications
            you would typically trust to store a password commonly used by you
            for critical applications.{" "}
          </div>
          <input
            type="submit"
            value="Submit"
            data-wait="Please wait..."
            class="submit-button w-button"
          />
          {error && <p class="error">{error}</p>}
        </form>

        <div class="w-form-done">
          <div>Thank you! Your submission has been received!</div>
        </div>
        <div class="w-form-fail">
          <div>Oops! Something went wrong while submitting the form.</div>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) =>({
  error: state.user.error
})
const mapDispatchToProps = (dispatch) => ({
  registerStart: (fullName, email, username, password) => dispatch(registerStart(fullName, email, username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
