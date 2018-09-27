import React from 'react'; 
import { Link } from 'react-router-dom';
import SignOutButton from "./SignOut"; 
import * as routes from '../constants/routes'; 


const Navigation = () => {
    return (
        <div className = "navigation">
            <ul>
                <li><Link to = {routes.SIGN_IN}>Sign In</Link></li>
                <li><Link to = {routes.LANDING}>Landing</Link></li>
                <li><Link to = {routes.HOME}>Home</Link></li>
                <li><Link to = {routes.ACCOUNT}>Account</Link></li>
                <SignOutButton />
            </ul>
        
        </div>
    )
};

export default Navigation; 
