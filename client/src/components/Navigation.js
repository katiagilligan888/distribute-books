import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";
import AuthUserContext from "./AuthUserContext"; 
import logo from '../logo.png'

const Navigation = () => {
  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </div>
  );
};

const NavigationAuth = () => {
  return (
   
    <nav className="navbar navbar-expand-sm navbar-light bg-light justify-content-between">
     <div className = "container">
      <Link className="navbar-brand" to={routes.LANDING}><img className = "logo" src ={logo} /></Link>
      <div className="navbar-nav d-flex flex-row justify-content-between">
            <Link className="nav-item nav-link" to={routes.HOME}>Home</Link>
            <Link className="nav-item nav-link" to={routes.BOOK_FORM}>Book Form</Link>
          <SignOutButton />
      </div>
      </div>
    </nav>
   
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light justify-content-between">
      <div className = "container">
            <Link  className="navbar-brand" to={routes.LANDING}><img className = "logo" src = {logo} /></Link>{" "}
          <Link to={routes.SIGN_IN}>
            <button type="button" className="btn btn-pill btn-secondary">Sign In</button>
          </Link>
          </div>
    </nav>
  );
};
export default Navigation;
