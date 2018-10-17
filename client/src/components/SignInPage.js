import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { SignUpLink } from "./SignUpPage";
import { PasswordForgetLink } from "./PasswordForget";
import { auth } from "../firebase";
import * as routes from "../constants/routes";

const SignInPage = ({ history }) => (
  <div className="sign-in-page">
    <SignInForm history={history} />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitHandler = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(err => {
        this.setState({ error: err });
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div className="sign-in-form">
        <form className="form" onSubmit={this.onSubmitHandler}>
          <h2>Sign In</h2>
          <div className = "row">
          <div className="form-group col-md-6">
            <input
              className="form-control"
              value={email}
              onChange={this.onChangeHandler}
              type="text"
              placeholder="Email Address"
              name="email"
            />
          </div>
          <div className="form-group col-md-6">
            <input
              className="form-control"
              value={password}
              onChange={this.onChangeHandler}
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          </div> 
          <button
            className="button-sign-in btn btn-lg btn-pill btn-primary"
            disabled={isInvalid}
            type="submit"
          >
            Sign In
          </button>

          {error && <p>{error.message}</p>}
          <PasswordForgetLink />
        <SignUpLink />
        </form>
        
      </div>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
