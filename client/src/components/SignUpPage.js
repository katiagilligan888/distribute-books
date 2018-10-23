import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../constants/routes";
import { auth, db } from "../firebase";
import bg from "../background.jpg";
import { Field, reduxForm } from "redux-form";
import { toast } from 'react-toastify'; 

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  renderField = field => {
    return (
      <div className="form-group col-md-12">
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.inputType}
          {...field.input}
        />
        {field.meta.touched ? (
          <span className="error">{field.meta.error}</span>
        ) : (
          ""
        )}
      </div>
    );
  };

  onSubmit = values => {
   
    auth
      .doCreateUserWithEmailAndPassword(values.email, values.passwordOne)
      .then(authUser => {
        // Create user in database
        db.doCreateUser(authUser.user.uid, values.username, values.email, values.temple, values.city)
          .then(() => {
            toast.info("Welcome!")
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
      });
  };

  render() {
    return (
      <div className="sign-up-form">
        <div className="form">
          <h2>Create a New Account</h2>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="row">
              <Field
                name="username"
                component={this.renderField}
                label="Username"
                inputType="text"
              />
              <Field
                name="email"
                label="Email"
                component={this.renderField}
                inputType="text"
              />
              <Field
                name="temple"
                label="Temple"
                component={this.renderField}
                inputType="text"
              />
              <Field
                name="city"
                label="City"
                component={this.renderField}
                inputType="text"
              />
              <Field
                name="passwordOne"
                label="Password"
                component={this.renderField}
                inputType="password"
              />
              <Field
                name="passwordTwo"
                label="Confirm Password"
                component={this.renderField}
                inputType="password"
              />
            </div>
            {this.state.error && <p className = "error">{this.state.error.message}</p>} 
            <button
              type="submit"
              className="sign-up-button btn btn-lg btn-pill btn-primary"
            >
              {" "}
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {}

  if(!values.username){
    errors.username = "Enter a valid username"
  }else if(values.username.length < 5){
    errors.username = "Username must be at least 5 letters long"
  }
  if(!values.email){
    errors.email = "Enter a valid email"
  }
  if(!values.temple){
    errors.temple = "Enter a valid temple"
  }
  if(!values.city){
    errors.city = "Enter a valid city"
  }
  if(!values.passwordOne){
    errors.passwordOne = "Enter a password"
  }
  if(!values.passwordTwo){
    errors.passwordTwo = "Reenter password to confirm"
  }
  if(values.passwordOne !== values.passwordTwo){
    errors.passwordTwo = "Passwords do not match"
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "SignUpForm"
})(SignUpForm);
