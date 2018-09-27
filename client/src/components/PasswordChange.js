import React from 'react'; 

import { auth } from '../firebase'; 

const INITIAL_STATE = {
    passwordOne: '', 
    passwordTwo: '', 
    error: null,
}

class PasswordChangeForm extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            ...INITIAL_STATE
        }
    }

    onChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitHandler = event => {
        event.preventDefault(); 
        const { passwordOne } = this.state
        auth.doPasswordUpdate(passwordOne).then(() => {
            this.setState({...INITIAL_STATE})
        }).catch(error => {
            this.setState({ error })
        })
    }

    render(){

        const {passwordOne, passwordTwo, error } = this.state
        const isInvalid = passwordOne !== passwordTwo || passwordOne === ''
        
        return(
            <div>
                <form onSubmit = {this.onSubmitHandler} >
                    <input onChange = {this.onChangeHandler} name = "passwordOne" value = {passwordOne} type = "password" placeholder = "New Password" />
                    <input onChange = {this.onChangeHandler} name = "passwordTwo" value = {passwordTwo} type = "password" placeholder = "Confirm New Password" />
                    <button disabled = {isInvalid} type = "submit">Reset My Password</button>

                    {error && <p>{error.message}</p>}
                    </form>
            </div>
        )
    }
}

export default PasswordChangeForm; 