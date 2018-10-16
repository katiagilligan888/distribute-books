import React from 'react'; 
import { auth } from "../firebase"; 

const SignOutButton = () => {
    return (
        <button type = "button" className="btn btn-pill btn-secondary"onClick = {auth.doSignOut}>
            Sign Out
        </button>
    )
}

export default SignOutButton; 