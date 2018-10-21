import React from "react";
import { db, auth } from "../firebase";
import { Field, FieldArray, reduxForm } from "redux-form";
import firebase from "firebase";
import * as routes from "../constants/routes";
import moment from "moment";

class BookForm extends React.Component {
  renderField = field => {
    return (
      <div className="form-group col-md-12">
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
      <div className="book-fields" key={index}>
        <h4 className="book-headline">Book #{index + 1}</h4>
        <Field
          className="form-control"
          name={`${book}.title`}
          component={this.renderField}
          label="Book Title"
          inputType="text"
        />
        <Field
          className="form-control"
          name={`${book}.language`}
          component={this.renderField}
          label="Book Language"
          inputType="text"
        />
        <Field
          className="form-control"
          name={`${book}.number`}
          component={this.renderField}
          label="Book Number"
          inputType="number"
        />
        <button
          onClick={() => fields.remove(index)}
          className="btn btn-danger btn-sm"
          type="button"
        >
          Remove Book
        </button>
      </div>
    );
  };

  renderBooks = ({ fields }) => {
    return (
      <div className="form-group col-md-12">
        {fields.map(this.renderBookSubFields)}
        <div className="text-center">
          <button
            className=" add-book-button btn btn-warning btn-lg"
            type="button"
            onClick={() => fields.push({})}
          >
            + Add Book
          </button>
        </div>
      </div>
    );
  };

  onSubmit = values => {
    const user = firebase.auth().currentUser;
    console.log(values);
    db.doCreateBook(
      user.uid,
      `${moment(`${values.date} 12:00`, "YYYY/MM/DD H:mm").valueOf()}`,
      values.date,
      values.typeOfDistribution,
      values.numberDistributors,
      values.books
        ? values.books.map(book => {
            return {
              title: book.title,
              language: book.language,
              number: book.number
            };
          })
        : null
    );
    db.doCreateBookScore(
      user.uid,
      `${moment(`${values.date} 12:00`, "YYYY/MM/DD H:mm").valueOf()}`,
      values.date,
      values.typeOfDistribution,
      values.numberDistributors,
      values.books ? values.books : null
    );
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="bookform">
        <div className="book-form-title">
          <h1>Book Form </h1>
          <h2>
            {" "}
            <strong>Instructions:</strong> Fill out the form with the
            information about the latest booksale{" "}
          </h2>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="form-row">
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
            <Field
              name="typeOfDistribution"
              component={this.renderField}
              label="Type of Distribution"
              inputType="text"
            />
            <FieldArray name="books" component={this.renderBooks} />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className=" submit-book-form btn btn-primary btn-lg"
            >
              Submit
            </button>
          </div>
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
