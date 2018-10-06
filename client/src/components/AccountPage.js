import React from "react";

import { PasswordForgetForm } from "./PasswordForget"; 
import PasswordChangeForm from "./PasswordChange"; 

import withAuthorization from "./withAuthorization"; 

const AccountPage = () => {
  return (
    <div>
      <h1>Account</h1>
      <PasswordChangeForm />
    </div>
  );
};

const authCondition = (authUser) => !!authUser


export default withAuthorization(authCondition)(AccountPage);
