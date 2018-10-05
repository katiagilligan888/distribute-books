import React from "react";
import BookForm from './BookForm'; 
import withAuthorization from './withAuthorization';

const BookFormPage = () => {
  return (
    <div>
      <BookForm />
    </div>
  );
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(BookFormPage);
