import React from 'react'; 
import {Button} from 'react-materialize';
import { auth } from "../firebase"; 

const SignOutButton = () => {
    return (
        <Button type = "button" onClick = {auth.doSignOut}>
            Sign Out
        </Button>
    )
}

export default SignOutButton; 