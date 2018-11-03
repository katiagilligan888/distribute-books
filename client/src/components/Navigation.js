import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";
import AuthUserContext from "./AuthUserContext";
import logo from "../assets/img/logo.png";
import bbtLogo from "../assets/img/BBTblack.png";
import {
  Button,
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const Navigation = () => {
  return (
    <div>
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </div>
  );
};

class NavigationAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar color="light" light>
          <Container>
            <NavbarBrand href="/" className="mr-auto">
              <Link to={routes.LANDING}>
                <img className="logo" src={logo} />
              </Link>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse isOpen={!this.state.isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <Link to={routes.HOME}>Home</Link>
                </NavItem>
                <NavItem>
                  <Link to={routes.BOOK_FORM}>Submit Book Scores</Link>
                </NavItem>
                <NavLink>
                  <SignOutButton />
                </NavLink>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const NavigationNonAuth = () => {
  return (
    <div>
      <Navbar color="light" light>
        <Container>
          <NavbarBrand href="/" className="mr-auto">
            <Link to={routes.LANDING}>
              <img className="logo" src={logo} />
            </Link>
          </NavbarBrand>
          <Nav navbar>
            <NavItem>
              <Link to={routes.SIGN_IN}>
                <Button type="button">Sign In</Button>
              </Link>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
export default Navigation;
