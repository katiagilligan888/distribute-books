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
    <div className="nav-auth">
      <ul>
        <li>
          <h2>
            <Link to={routes.LANDING}><img className = "logo" src ={logo} /></Link>
          </h2>
        </li>
        <div className="nav-links-auth">
          <li>
            <Link to={routes.HOME}>Home</Link>
          </li>
          {/* <li>
            <Link to={routes.ACCOUNT}>Account</Link>
          </li> */}
          <li>
            <Link to={routes.BOOK_FORM}>Book Form</Link>
          </li>
          <SignOutButton />
        </div>
      </ul>
    </div>
  );
};

const NavigationNonAuth = () => {
  return (
    <div className="nav">
      <ul>
        <li>
          <h2>
            <Link to={routes.LANDING}><img className = "logo" src = {logo} /></Link>{" "}
          </h2>
        </li>
        <li>
          <Link to={routes.SIGN_IN}>
            <button type="button" className="btn btn-pill btn-secondary">Sign In</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Navigation;
