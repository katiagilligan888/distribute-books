import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { SignUpLink } from "./SignUpPage";
import { PasswordForgetLink } from "./PasswordForget";
import { auth } from "../firebase";
import * as routes from "../constants/routes";

class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      error: ""
    };
  }

  renderField = field => {
    return (
      <div className="container">
        <div className="form-group col-md-12">
          <label>{field.label}</label>
          <input
            className="form-control"
            type={field.inputType}
            {...field.input}
          />
          {field.meta.touched ? (
            <span className="text-danger">{field.meta.error}</span>
          ) : (
            ""
          )}
        </div>
      </div>

    );
  };

  onSubmit = values => {
    const { history } = this.props;
    auth
      .doSignInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        history.push(routes.HOME);
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="sign-in-form">
        <form className="form" onSubmit={handleSubmit(this.onSubmit)}>
          <h2>Sign In</h2>
          <div className="form-row">
            <Field
              name="email"
              component={this.renderField}
              label="Email Address"
              inputType="text"
            />
            <Field
              name="password"
              component={this.renderField}
              label="Password"
              inputType="password"
            />
          </div>
          <button
            className="button-sign-in btn btn-lg btn-primary"
            type="submit"
          >
            Sign In
          </button>
          <div>
            To sign up, please email info@bbtbooks.org to request access
          </div>

          {this.state.error && (
            <p className="text-danger">{this.state.error.message}</p>
          )}
          <p> Email <a href = "mailto:info@bbtbooks.org">info@bbtbooks.org</a> to set up an account </p>
          {/* <PasswordForgetLink /> */}
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Enter a valid email";
  }
  if (!values.password) {
    errors.password = "Enter a valid password";
  }

  return errors;
};

export default reduxForm({ validate, form: "SignInForm" })(SignInForm);
