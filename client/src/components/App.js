import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'; 
import { firebase } from '../firebase'; 

import Navigation from './Navigation'; 
import LandingPage from './LandingPage';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import PasswordForget from './PasswordForget';
import HomePage from './HomePage';
import AccountPage from './AccountPage';


import * as routes from '../constants/routes'
import  withAuthentication from './withAuthentication'; 


const App = () => {
    
    return (
        <div>
            <Navigation  />
            <Route exact path = {routes.LANDING} component = {LandingPage} />
            <Route path = {routes.SIGN_UP} component = {SignUpPage} />
            <Route path = {routes.SIGN_IN} component = {SignInPage} />
            <Route path = {routes.PASSWORD_FORGET} component = {PasswordForget} />
            <Route path = {routes.HOME} component = {HomePage} />
            <Route path = {routes.ACCOUNT} component = {AccountPage} />
        </div>
    )
}

    
    


export default withAuthentication(App);
