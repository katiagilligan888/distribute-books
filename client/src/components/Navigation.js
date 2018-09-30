import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";
import AuthUserContext from "./AuthUserContext";

const Navigation = () => {
  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
      </AuthUserContext.Consumer>
    </div>
  );
};

const NavigationAuth = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={routes.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={routes.HOME}>Home</Link>
        </li>
        <li>
          <Link to={routes.ACCOUNT}>Account</Link>
        </li>
        <SignOutButton />
      </ul>
    </div>
  );
};

const NavigationNonAuth = () => {
  return (
    <div className = "nav">
      <ul>
        <li>
          <Link to={routes.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </div>
  );
};
export default Navigation;
