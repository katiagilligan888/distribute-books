import React from "react";
import { Link, withRouter } from "react-router-dom"; 
import * as routes from "../constants/routes";
import { auth, db } from "../firebase";
import bg from "../background.jpg";

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
        db.doCreateUser(authUser, username, email, temple, city)
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
          <h2>Create a New Account</h2>
          <form onSubmit={this.onSubmitHandler}>
            <div className="row">
              <div className="form-group col-md-6">
                <input
                  className="form-control"
                  value={username}
                  name="username"
                  onChange={this.onChangeHandler}
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  className="form-control"
                  value={email}
                  name="email"
                  onChange={this.onChangeHandler}
                  type="text"
                  placeholder="Email Address"
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  className="form-control"
                  value={temple}
                  name="temple"
                  onChange={this.onChangeHandler}
                  type="text"
                  placeholder="Temple"
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  className="form-control"
                  value={city}
                  name="city"
                  onChange={this.onChangeHandler}
                  type="text"
                  placeholder="City"
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  className="form-control"
                  value={passwordOne}
                  name="passwordOne"
                  onChange={this.onChangeHandler}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  className="form-control"
                  value={passwordTwo}
                  name="passwordTwo"
                  onChange={this.onChangeHandler}
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            {error && <p>{error.message}</p>} 
            <button disabled={isInvalid} type="submit" className = "sign-up-button btn btn-lg btn-pill btn-primary">
              {" "}
              Sign Up
            </button>
            
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
