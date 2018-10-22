import React from "react";
import { db, auth } from "../firebase";
import { Field, FieldArray, reduxForm, reset} from "redux-form";
import firebase from "firebase";
import * as routes from "../constants/routes";
import moment from "moment";
import Select from "react-select";

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#434857"
  }),
  placeholder: styles => ({
    ...styles,
    color: "white"
  }),
  input: styles => ({
    ...styles,
    color: "white"
  }),
  singleValue: styles => ({
    ...styles,
    color: "white"
  }),
  option: styles => ({
    ...styles,
    color: "white",
    backgroundColor: "#434857"
  })
};

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
              <Field
                name={`${book}.title`}
                component={this.renderField}
                label="Book Title"
                inputType="text"
              />
              <label>Book Language</label>
              <Field
                name={`${book}.language`}
                const component={props => (
                  <Select
                    styles={customStyles}
                    label="Book Language"
                    className="book-language"
                    value={props.input.value}
                    onChange={props.input.onChange}
                    onBlur={() => props.input.onBlur(props.input.value)}
                    options={[
                      { value: "Amharic", label: "Amharic" },
                      { value: "Arabic", label: "Arabic" },
                      { value: "Armenian", label: "Armenian" },
                      { value: "Assamese", label: "Assamese" },
                      { value: "Bengali", label: "Bengali" },
                      { value: "Chinese", label: "Chinese" },
                      { value: "Danish", label: "Danish" },
                      { value: "Estonian", label: "Estonian" },
                      { value: "Farsi", label: "Farsi" },
                      { value: "French", label: "French" },
                      { value: "German", label: "German" },
                      { value: "Greek", label: "Greek" },
                      { value: "Gujarati", label: "Gujarati" },
                      { value: "Hebrew", label: "Hebrew" },
                      { value: "Hindi", label: "Hindi" },
                      { value: "Hungarian", label: "Hungarian" },
                      { value: "Icelandic", label: "Icelandic" },
                      { value: "Italian", label: "Italian" },
                      { value: "Japanese", label: "Japanese" },
                      { value: "Kannada", label: "Kannada" },
                      { value: "Kiswahili", label: "Kiswahili" },
                      { value: "Korean", label: "Korean" },
                      { value: "Mandarin", label: "Mandarin" },
                      { value: "Marathi", label: "Marathi" },
                      { value: "Oriya", label: "Oriya" },
                      { value: "Polish", label: "Polish" },
                      { value: "Portuguese", label: "Portugese" },
                      { value: "Russian", label: "Russian" },
                      { value: "Spanish", label: "Spanish" },
                      { value: "Swedish", label: "Swedish" },
                      { value: "Telugu", label: "Telugu" },
                      { value: "Thai", label: "Thai" },
                      { value: "Ukranian", label: "Ukranian" },
                      { value: "Urdu", label: "Urdu" },
                      { value: "Vietnamese", label: "Vietnamese" },
                      { value: "Zulu", label: "Zulu" },
                      { value: "Croatian", label: "Croatian" },
                      { value: "Nepali", label: "Nepali" },
                      { value: "Afrikaans", label: "Afrikaans" },
                      { value: "Albanian", label: "Albanian" },
                      { value: "Azerbaijani", label: "Azerbaijani" },
                      { value: "Bashkir", label: "Bashkir" },
                      { value: "Belarusian", label: "Belarisian" },
                      { value: "Bosnian", label: "Bosnian" },
                      { value: "Bulgarian", label: "Bulgarian" },
                      { value: "Burmese", label: "Burmese" },
                      { value: "Chhattisgarhi", label: "Chhattisgarhi" },
                      { value: "Chuvash", label: "Chuvash" },
                      { value: "Czech", label: "Czech" },
                      { value: "Dutch", label: "Dutch" },
                      { value: "Esperanto", label: "Esperanto" },
                      { value: "Finnish", label: "Finnish" },
                      { value: "Georgian", label: "Georgian" },
                      { value: "Glish", label: "Glish" },
                      { value: "Indonesian", label: "Indonesian" },
                      { value: "Karakalpak", label: "Karalpak" },
                      { value: "Kazakh", label: "Kazakh" },
                      { value: "Khmer", label: "Khmer" },
                      { value: "Kirgiz", label: "Kirgiz" },
                      { value: "Lao", label: "Lao" },
                      { value: "Latvian", label: "Latvian" },
                      { value: "Lithuanian", label: "Lithuanian" },
                      { value: "Macedonian", label: "Macedonian" },
                      { value: "Malayalam", label: "Malayalam" },
                      { value: "Manipuri", label: "Manipuri" },
                      { value: "Mauritius Creole", label: "Mauritius Creole" },
                      { value: "Mongolian", label: "Mongolian" },
                      { value: "Newari", label: "Newari" },
                      { value: "Norwegian", label: "Norwegian" },
                      { value: "Pidgin", label: "Pidgin" },
                      { value: "Punjabi", label: "Punjabi" },
                      { value: "Romanian", label: "Romanian" },
                      { value: "Serbian", label: "Serbian" },
                      { value: "Serbo-Croatian", label: "Serbo-Croatian" },
                      { value: "Sindhi", label: "Sindhi" },
                      { value: "Slovak", label: "Slovak" },
                      { value: "Slovene", label: "Slovene" },
                      { value: "Swahili", label: "Swahili" },
                      { value: "Tagalog", label: "Tagalog" },
                      { value: "Tajik", label: "Tajik" },
                      { value: "Tamil", label: "Tamil" },
                      { value: "Tatar", label: "Tatar" },
                      { value: "Tibetan", label: "Tibetan" },
                      { value: "Tswana", label: "Tswana" },
                      { value: "Turkish", label: "Turkish" },
                      { value: "Turkmen", label: "Turkmen" },
                      { value: "Udmurt", label: "Udmurt" },
                      { value: "Uzbekh", label: "Uzbekh" },
                      { value: "Zhosa", label: "Zhosa" }, 
                      {value: "English", label: "English"}
                    ]}
                    placeholder="Select Language"
                    simpleValue
                  />
                )}
                
              />
              <Field
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
        })}
        <div className="text-center">
          <button
            className=" add-book-button btn btn-warning btn-lg"
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
    ).then(() => db.doCreateBookScore(
      user.uid,
      `${moment(`${values.date} 12:00`, "YYYY/MM/DD H:mm").valueOf()}`,
      values.date,
      values.typeOfDistribution,
      values.numberDistributors,
      values.books
    )).then(() => {
      this.props.reset()
    })
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
          <div className=" buttons-submit-clear text-center">
            <button
              type="submit"
              className=" submit-book-form btn btn-primary btn-lg"
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
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
