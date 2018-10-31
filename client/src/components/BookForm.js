import React from "react";
import { db, auth } from "../firebase";
import { Field, FieldArray, reduxForm, reset } from "redux-form";
import { toast } from "react-toastify";
import firebase from "firebase";
import * as routes from "../constants/routes";
import moment from "moment";
import Select from "react-select";
import { languageOptions, distributeOptions, bookTitles } from "./options";

class BookForm extends React.Component {
  renderField = field => {
    return (
      <div className="book-input form-group col-md-12">
        <label className="book-label">{field.label}</label>
        <input
          className="form-control"
          type={field.inputType}
          {...field.input}
        />
        {field.meta.touched ? (
          <span className="error">{field.meta.error}</span>
        ) : (
          ""
        )}
      </div>
    );
  };

  renderBooks = ({ fields, meta: { error, submitFailed } }) => {
    return (
      <div className="form-group col-md-12">
        {fields.map((book, index, fields) => {
          return (
            <div className="book-fields" key={index}>
              <h4 className="book-headline">Book #{index + 1}</h4>
              <div className="form-group col-md-12">
                <label>Book Title</label>
                <Field
                  name={`${book}.title`}
                  className="form-control"
                  component={props => (
                    <Select
                      value={props.input.value}
                      onChange={props.input.onChange}
                      onBlur={() => props.input.onBlur(props.input.value)}
                      options={bookTitles}
                      placeholder="Select Book"
                      simpleValue
                    />
                  )}
                />
              </div>
              <div className="form-group col-md-12">
                <label className="book-language-label">Book Language</label>
                <Field
                  name={`${book}.language`}
                  className="form-control"
                  component={props => (
                    <Select
                      value={props.input.value}
                      onChange={props.input.onChange}
                      onBlur={() => props.input.onBlur(props.input.value)}
                      options={languageOptions}
                      placeholder="Select Language"
                      simpleValue
                    />
                  )}
                />
              </div>
              <Field
                name={`${book}.number`}
                component={this.renderField}
                label="Number of Books"
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
        })}
        <div className="text-center">
          <button
            className=" add-book-button btn btn-info"
            type="button"
            onClick={() => fields.push({})}
          >
            + Add Book
          </button>
          {submitFailed && error && <div className="error">{error}</div>}
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
      values.books.map(book => {
        return {
          title: book.title,
          language: book.language.value,
          number: book.number
        };
      })
    )
      .then(() =>
        db.doCreateBookScore(
          user.uid,
          `${moment(`${values.date} 12:00`, "YYYY/MM/DD H:mm").valueOf()}`,
          values.date,
          values.typeOfDistribution,
          values.numberDistributors,
          values.books
        )
      )
      .then(() => {
        toast.info("Form successfully submitted!");
        this.props.reset();
      });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="bookform">
        <div className="book-form-title">
          <h1>Submit your latest book scores</h1>
          <h2>
            {" "}
            Fill out the form below. For each language and book type variation,
            click "Add Book". At the end, click "Submit" to finalize your
            scores.{" "}
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
            <div className="form-group col-md-12">
              <label>Type of Distribution </label>
              <Field
                name="typeOfDistribution"
                className="form-control"
                component={props => (
                  <Select
                    value={props.input.value}
                    onChange={props.input.onChange}
                    onBlur={() => props.input.onBlur(props.input.value)}
                    options={distributeOptions}
                    placeholder="Select Type"
                    simpleValue
                  />
                )}
              />
            </div>
            <FieldArray name="books" component={this.renderBooks} />
          </div>
          <div className=" buttons-submit-clear text-center">
            <button
              type="submit"
              className=" submit-book-form btn btn-primary btn-lg"
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-danger btn-lg"
              onClick={this.props.reset}
            >
              Clear Values
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
  } else if (Number(values.numberDistributors) < 1) {
    errors.numberDistributors = "Number of Distributors needs to at least be 1";
  } else if (Number(values.numberDistributors) > 300) {
    errors.numberDistributors = "Number of Distributors cannot exceed 300";
  }

  if (!values.typeOfDistribution) {
    errors.typeOfDistribution = "Enter a valid type of distribution";
  }

  if (!values.books || !values.books.length) {
    errors.books = { _error: "At least one book must be entered" };
  } else {
    const bookArrayErrors = [];
    values.books.forEach((book, bookIndex) => {
      const bookErrors = {};
      if (!book || !book.title) {
        bookErrors.title = "Enter a title";
        bookArrayErrors[bookIndex] = bookErrors;
      }
      if (!book || !book.language) {
        bookErrors.language = "Enter a language";
        bookArrayErrors[bookIndex] = bookErrors;
      }
      if (!book || !book.number) {
        bookErrors.number = "Enter a number";
        bookArrayErrors[bookIndex] = bookErrors;
      } else if (Number(book.number) < 1) {
        bookErrors.number = "Number needs to be at least 1";
        bookArrayErrors[bookIndex] = bookErrors;
      } else if (Number(book.number) > 3000) {
        bookErrors.number = "Number cannot exceed 3000";
        bookArrayErrors[bookIndex] = bookErrors;
      }
    });
    if (bookArrayErrors.length) {
      errors.books = bookArrayErrors;
    }
  }

  return errors;
};

export default reduxForm({
  validate,
  form: "BookForm"
})(BookForm);
