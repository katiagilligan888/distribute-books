import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'; 
import { firebase } from '../firebase'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import Navigation from './Navigation'; 
import LandingPage from './LandingPage';
import SignUpForm from './SignUpPage';
import SignInForm from './SignInPage';
import PasswordForget from './PasswordForget';
import BookFormPage from './BookFormPage';
import HomePage from './HomePage'; 
import AccountPage from './AccountPage';
import Footer from './Footer';


import * as routes from '../constants/routes'
import  withAuthentication from './withAuthentication'; 

import ReactGA from 'react-ga';

const App = () => {

    (function initializeReactGA() {
        ReactGA.initialize('UA-128423389-1');
        ReactGA.pageview('/');
    })();
    
    return (
        <div>
            <Navigation  />
            <Route exact path = {routes.LANDING} component = {HomePage} />
            <Route path = {routes.SIGN_UP} component = {SignUpForm} />
            <Route path = {routes.SIGN_IN} component = {SignInForm} />
            <Route path = {routes.PASSWORD_FORGET} component = {PasswordForget} />
            <Route path = {routes.BOOK_FORM} component = {BookFormPage} />
            <Route path = {routes.ACCOUNT} component = {AccountPage} />
            <Route path = {routes.HOME} component = {HomePage} />
            <ToastContainer position="top-right" />
            <Footer />
        </div>
    )
}

    
    


export default withAuthentication(App);
