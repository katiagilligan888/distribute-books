import React from 'react'; 

import { firebase } from '../firebase'; 
import AuthUserContext from './AuthUserContext'; 

// Higher Order Component that encapsulates whether User is logged in or out

const withAuthentication = (Component) => 
    class WithAuthentication extends React.Component {
        constructor(props){
            super(props);
            this.state  = {
                authUser: null
            }; 
        }

        componentDidMount(){
            firebase.auth.onAuthStateChanged(authUser => {
                authUser ? this.setState({ authUser }) : this.setState({ authUser: null }); 
            })
        }

        render(){

            const { authUser } = this.state;

            return(
                // Provider gives access of state of authUser to all components that use HOC
                <AuthUserContext.Provider value = { authUser }>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            ); 
        }
    }

export default withAuthentication