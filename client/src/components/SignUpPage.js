import React from "react";
import { Link, withRouter } from "react-router-dom";

import * as routes from "../constants/routes";
import { auth, db } from "../firebase";
import bg from "../background.jpg";

import { Button, Input, Row } from "react-materialize";

const SignUpPage = ({ history }) => {
  return (
    <div className="sign-up-page">
      <SignUpForm history={history} />
    </div>
  );
};

const INITIAL_STATE = {
  username: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  temple: "",
  city: ""
};

class SignUpForm extends React.Component {
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
    const { username, email, passwordOne, error, temple, city } = this.state;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create user in database
        db.doCreateUser(authUser.user.uid, username, email, temple, city)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(routes.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(err => {
        this.setState({
          error: err
        });
        console.log(error);
      });

    event.preventDefault();
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      temple,
      city
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "" ||
      temple === "";
    return (
      <div className="sign-up-form">
        <div className="form">
          <h1>Distribute Books</h1>
          <h2>Create a New Account</h2>
          <form onSubmit={this.onSubmitHandler}>
            <Row>
              <Input
                s={6}
                value={username}
                name="username"
                onChange={this.onChangeHandler}
                type="text"
                placeholder="Full Name"
              />
              <Input
                s={6}
                value={email}
                name="email"
                onChange={this.onChangeHandler}
                type="text"
                placeholder="Email Address"
              />
              <Input
                s={6}
                value={temple}
                name="temple"
                onChange={this.onChangeHandler}
                type="text"
                placeholder="Temple"
              />
              <Input
                s={6}
                value={city}
                name="city"
                onChange={this.onChangeHandler}
                type="text"
                placeholder="City"
              />
              <Input
                s={6}
                value={passwordOne}
                name="passwordOne"
                onChange={this.onChangeHandler}
                type="password"
                placeholder="Password"
              />
              <Input
                s={6}
                value={passwordTwo}
                name="passwordTwo"
                onChange={this.onChangeHandler}
                type="password"
                placeholder="Confirm Password"
              />
            </Row>
            {error && <p>{error.message}</p>}
            <Button disabled={isInvalid} type="submit">
              {" "}
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const SignUpLink = () => {
  return (
    <div>
      <p>
        Don't have an account?
        <Link to={routes.SIGN_UP}> Sign Up </Link>
      </p>
    </div>
  );
};

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
