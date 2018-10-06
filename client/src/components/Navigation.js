import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";
import AuthUserContext from "./AuthUserContext";
import { Button } from "react-materialize";

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
            <Link to={routes.LANDING}>Distribute Books</Link>
          </h2>
        </li>
        <div className="nav-links-auth">
          <li>
            <Link to={routes.HOME}>Home</Link>
          </li>
          <li>
            <Link to={routes.ACCOUNT}>Account</Link>
          </li>
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
            <Link to={routes.LANDING}> Distribute Books</Link>{" "}
          </h2>
        </li>
        <li>
          <Link to={routes.SIGN_IN}>
            <Button>Sign In</Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Navigation;
