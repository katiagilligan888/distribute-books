import React from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase";
import * as routes from "../constants/routes";

const PasswordForgetPage = () => {
  return (
    <div>
      <h1>Forgot Password </h1>
      <PasswordForgetForm />
    </div>
  );
};

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }

  onChangeHandler = event => {
    this.setState({
      email: event.target.value
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input
            onChange={this.onChangeHandler}
            type="text"
            value={email}
            placeholder="Email Address"
          />
          <button disabled={isInvalid} type="submit">
            {" "}
            Reset my Password{" "}
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const PasswordForgetLink = () => {
  return (
    <div>
      <p> 
        <Link to = {routes.PASSWORD_FORGET}> Forgot Password? </Link>
        </p>
      </div>
  )
}

export default PasswordForgetPage;

export {
  PasswordForgetLink,
  PasswordForgetForm
}
