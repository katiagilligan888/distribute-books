import React from "react";
import { db, auth } from "../firebase";
import { Field, FieldArray, reduxForm } from "redux-form";
import firebase from "firebase";
import * as routes from "../constants/routes";
// import moment from 'moment';

class BookForm extends React.Component {
  // onSubmitHandler = event => {
  //   const {
  //     date,
  //     distributionType,
  //     numberDistributors,
  //     bookTitle,
  //     bookLanguage,
  //     bookNumber,
  //     books
  //   } = this.state;

  //   event.preventDefault();
  //   const user = firebase.auth().currentUser;
  //   if (user) {
  //     if (bookTitle || bookLanguage || bookNumber) {
  //       const book = {
  //         bookTitle: this.state.bookTitle,
  //         bookLanguage: this.state.bookLanguage,
  //         bookNumber: this.state.bookNumber
  //       };
  //       const booksArr = [...this.state.books, book];
  //       this.setState({
  //         books: booksArr,
  //         bookTitle: "",
  //         bookLanguage: "",
  //         bookNumber: ""
  //       });
  //       db.doCreateBook(
  //         user.uid,
  //         // `${moment(`${date} 12:00`,'YYYY/MM/DD H:mm').valueOf()}`,
  //         date,
  //         date,
  //         distributionType,
  //         numberDistributors,
  //         bookNumber,
  //         booksArr.map(book => {
  //           return {
  //             title: book.bookTitle,
  //             language: book.bookLanguage,
  //             number: book.bookNumber
  //           };
  //         })
  //       )
  //       db.doCreateBookScore(
  //         user.uid,
  //         // `${moment(`${date} 12:00`,'YYYY/MM/DD H:mm').valueOf()}`,
  //         date,
  //         date,
  //         distributionType,
  //         numberDistributors,
  //         booksArr.map(book => {
  //           return {
  //             title: book.bookTitle,
  //             language: book.bookLanguage,
  //             number: book.bookNumber
  //           };
  //         })
  //       )
  //         .then(() => {
  //           this.setState({ ...INITIAL_STATE });
  //           this.props.history.push(routes.HOME);
  //         })
  //         .catch(error => {
  //           this.setState({ error });
  //           console.log(this.state.error);
  //         });
  //     } else {
  //       db.doCreateBook(
  //         user.uid,
  //         date,
  //         distributionType,
  //         numberDistributors,
  //         books.map(book => {
  //           return {
  //             title: book.bookTitle,
  //             language: book.bookLanguage,
  //             number: book.bookNumber
  //           };
  //         })
  //       )
  //         .then(() => {
  //           this.setState({ ...INITIAL_STATE });
  //         })
  //         .catch(error => {
  //           this.setState({ error });
  //           console.log(this.state.error);
  //         });
  //     }
  //   }
  // };

  renderField = field => {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.inputType}
          {...field.input}
        />
        {field.meta.touched ? field.meta.error : ""}
      </div>
    );
  };

  renderBookSubFields = (book, index, fields) => {
    return (
      <li key={index}>
        <button type="button">Remove Book</button>
        <h4>Book #{index + 1}</h4>
        <Field
          name={`${book}.title`}
          component={this.renderField}
          label="Book Title"
          inputType="text"
        />
        <Field
          name={`${book}.language`}
          component={this.renderField}
          label="Book Language"
          inputType="text"
        />
        <Field
          name={`${book}.number`}
          component={this.renderField}
          label="Book Number"
          inputType="number"
        />
      </li>
    );
  };

  renderBooks = ({ fields }) => {
    return (
      <ul>
        {fields.map(this.renderBookSubFields)}
        <button type = "button" onClick = {() => fields.push({})}>Add Book</button>
      </ul>
    )
  }

  onSubmit = values => {
    console.log(values);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="bookform">
        <h1>Book Form </h1>
        <h2>
          {" "}
          <strong>Instructions:</strong> Fill out the form with the information
          about the latest booksale{" "}
        </h2>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="date"
            component={this.renderField}
            label="Date of Event"
            inputType="date"
          />
          <Field
            name="numberDistributors"
            component={this.renderField}
            label="Number of Distributors"
            inputType="number"
          />
          <Field name = "typeOfDistribution"
          component = {this.renderField}
          label = "Type of Distribution"
          inputType = "text"
          />
          <FieldArray name = "books" component = {this.renderBooks}/>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.date) {
    errors.date = "Enter a valid date";
  }
  if (!values.numberDistributors) {
    errors.numberDistributors = "Enter a valid number of distributors";
  }
  if (!values.bookNumber) {
    errors.bookNumber = "Enter a valid number of books";
  }

  return errors;
};

export default reduxForm({
  validate,
  form: "BookForm"
})(BookForm);
