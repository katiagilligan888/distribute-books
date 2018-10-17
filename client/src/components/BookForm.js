import React from "react";
import { db, auth } from "../firebase";
import firebase from "firebase";
import * as routes from "../constants/routes";
import {Input} from 'react-materialize'; 

const INITIAL_STATE = {
  date: "",
  distributionType: "",
  numberDistributors: "",
  bookInputs: ["book-0"],
  books: [],
  bookTitle: "",
  bookLanguage: "",
  bookNumber: ""
};

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  appendBookInput = e => {
    e.preventDefault();
    const book = {
      bookTitle: this.state.bookTitle,
      bookLanguage: this.state.bookLanguage,
      bookNumber: this.state.bookNumber
    };

    const booksArr = [...this.state.books, book];

    this.setState({
      bookInputs: this.state.bookInputs.concat([
        `book-${this.state.bookInputs.length}`
      ]),
      books: booksArr,
      bookTitle: "",
      bookLanguage: "",
      bookNumber: ""
    });
  };

  onSubmitHandler = event => {
    const {
      date,
      distributionType,
      numberDistributors,
      bookTitle,
      bookLanguage,
      bookNumber,
      books
    } = this.state;

    const myDate = new Date(`${this.state.date}`)

    event.preventDefault();
    const user = firebase.auth().currentUser;
    if (user) {
      if (bookTitle || bookLanguage || bookNumber) {
        const book = {
          bookTitle: this.state.bookTitle,
          bookLanguage: this.state.bookLanguage,
          bookNumber: this.state.bookNumber
        };
        const booksArr = [...this.state.books, book];
        this.setState({
          books: booksArr,
          bookTitle: "",
          bookLanguage: "",
          bookNumber: ""
        });
        db.doCreateBook(
          user.uid,
          date,
          distributionType,
          numberDistributors,
          booksArr.map(book => {
            return {
              title: book.bookTitle,
              language: book.bookLanguage,
              number: book.bookNumber
            };
          })
        )
          .then(() => {
            this.setState({ ...INITIAL_STATE });
          })
          .catch(error => {
            this.setState({ error });
            console.log(this.state.error);
          });
      } else {
        db.doCreateBook(
          user.uid,
          date,
          distributionType,
          numberDistributors,
          books.map(book => {
            return {
              title: book.bookTitle,
              language: book.bookLanguage,
              number: book.bookNumber
            };
          })
        )
          .then(() => {
            this.setState({ ...INITIAL_STATE });
          })
          .catch(error => {
            this.setState({ error });
            console.log(this.state.error);
          });
      }
    }
  };

  render() {
    return (
      <div className="bookform">
        <h1>Book Form </h1>
        <h2>
          {" "}
          <strong>Instructions:</strong> Fill out the form with the information
          about the latest booksale{" "}
        </h2>
        <form onSubmit={this.onSubmitHandler}>
          <div className="form-row justify-content-center">
            <div className="form-group col-md-2">
              <label for="dateOfEvent"> Date of Event</label>
              <input
                className="form-control"
                value={this.state.date}
                name="date"
                type="date"
                onChange={this.onChangeHandler}
                label="Date"
              />
            </div>
            <div className="form-group col-md-3">
              <label for="numberOfDistributors">Number of Distibutors</label>
              <input
                className="form-control"
                value={this.state.numberDistributors}
                name="numberDistributors"
                type="number"
                onChange={this.onChangeHandler}
                label="Number of Distributors"
              />
            </div>
            <div className="form-group col-md-5">
              <label for="distributionType">Type of Book Distribution </label>
              <select
                className="form-control"
                value={this.state.distributionType}
                name="distributionType"
                onChange={this.onChangeHandler}
              >
                <option value="" disabled selected>
                  Choose Your Distribution Type{" "}
                </option>
                <option value="option 1"> Option 1 </option>
                <option value="option 2"> Option 2</option>
                <option value="option 3"> Option 3 </option>
                <option value="option 4"> Option 4 </option>
              </select>
            </div>
            {this.state.bookInputs.map((input, index) => (
              <div className="dynamicBooks">
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label for="bookTitle">Book Title</label>
                    <input
                      className="form-control"
                      name="bookTitle"
                      type="text"
                      onChange={this.onChangeHandler}
                      label="Book Title"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label for="bookLanguage">Book Language</label>
                    <input
                      className="form-control"
                      name="bookLanguage"
                      type="text"
                      onChange={this.onChangeHandler}
                      label="Book Language"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label for="bookNumber">Number of Books</label>
                    <input
                      className="form-control"
                      name="bookNumber"
                      type="number"
                      onChange={this.onChangeHandler}
                      label="Number of Books"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-pill btn-success button-add-book"
            onClick={this.appendBookInput}
          >
            {" "}
            Add Another Book{" "}
          </button>
          <div className="button-container">
            <button
              type="button"
              className="btn btn-lg btn-pill btn-primary"
              type="submit"
            >
              Add Book Data
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default BookForm;
