import React from "react";
import BookForm from './BookForm'; 
import withAuthorization from './withAuthorization';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <BookForm />
    </div>
  );
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(HomePage);
