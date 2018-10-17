import React from "react";
import BookForm from './BookForm'; 
import withAuthorization from './withAuthorization';

const BookFormPage = ({history}) => {
  return (
    <div>
      <BookForm history = {history} />
    </div>
  );
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(BookFormPage);
