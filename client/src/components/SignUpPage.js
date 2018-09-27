import React from "react";
import { Link, withRouter } from "react-router-dom";

import * as routes from "../constants/routes";
import { auth } from "../firebase"; 

const SignUpPage = ({history}) => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm history = {history} />
    </div>
  );
};

const INITIAL_STATE = {
    username: '',
    passwordOne: '',
    passwordTwo: '', 
    error: null,
}

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE}
  }

  onChangeHandler = event => {
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  onSubmitHandler = event => {
   
    const { username, email, passwordOne, error } = this.state;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne).then(authUser => {
        this.setState({
            ...INITIAL_STATE
        })
        this.props.history.push(routes.HOME); 
    }).catch(err => {
        this.setState({
            error: err
        })
        console.log(error)
    })

    event.preventDefault();

  };

  render() {

    const { username, email, passwordOne, passwordTwo, error } = this.state

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === ''; 
    return (
        <div>
    <form onSubmit={this.onSubmitHandler}>
        <input 
            value = {username} 
            name = "username" 
            onChange = {this.onChangeHandler} 
            type = "text" 
            placeholder = "Username" />
         <input 
            value = {email} 
            name = "email" 
            onChange = {this.onChangeHandler} 
            type = "text" 
            placeholder = "Email Address" />
        <input 
            value = {passwordOne} 
            name = "passwordOne" 
            onChange = {this.onChangeHandler} 
            type = "password" 
            placeholder = "Password" />
        <input 
            value = {passwordTwo} 
            name = "passwordTwo" 
            onChange = {this.onChangeHandler} 
            type = "password" 
            placeholder = "Confirm Password" />
        <button disabled = {isInvalid} type = "submit"> Sign Up
        </button>
        {error && <p>{error.message}</p>}
     </form>;
     </div>
     )
  }
}

const SignUpLink = () => {
    return(
        <div>
            <p>
                Don't have an account?
                <Link to={routes.SIGN_UP}> Sign Up </Link>
            </p>;
        </div>
    )
};

export default withRouter(SignUpPage);

export {
    SignUpForm, 
    SignUpLink,
};
