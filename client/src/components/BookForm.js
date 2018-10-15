import React from "react";
import {Row, Input, Button } from "react-materialize";
import { db, auth } from "../firebase";
import firebase from "firebase";
import * as routes from "../constants/routes";

const INITIAL_STATE = {
  date: "",
  distributionType: "",
  numberDistributors: "",
  bookInputs: ['book-0'], 
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


  appendBookInput = (e) => {
    e.preventDefault()
    const book = {
      bookTitle: this.state.bookTitle,
      bookLanguage: this.state.bookLanguage, 
      bookNumber: this.state.bookNumber
    }

    const booksArr = [...this.state.books, book]

    this.setState({
      bookInputs: this.state.bookInputs.concat([`book-${this.state.bookInputs.length}`]), 
      books: booksArr,
      bookTitle: "", 
      bookLanguage: "", 
      bookNumber: ""
    })
  }


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

    
    
    event.preventDefault();
    const user = firebase.auth().currentUser;
    if (user) {
      if(bookTitle || bookLanguage || bookNumber){
        const book = {
          bookTitle: this.state.bookTitle,
          bookLanguage: this.state.bookLanguage, 
          bookNumber: this.state.bookNumber
        }
        const booksArr = [...this.state.books, book]
        this.setState({
          books: booksArr,
          bookTitle: "", 
          bookLanguage: "", 
          bookNumber: ""
        })
      db.doCreateBook(
        user.uid,
        date,
        distributionType,
        numberDistributors,
        booksArr.map(book =>{
          return {title: book.bookTitle, language: book.bookLanguage, number: book.bookNumber}
        })
      )
        .then(() => {
          this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
          this.setState({ error });
          console.log(this.state.error)
        });
    }else{
      db.doCreateBook(
        user.uid,
        date,
        distributionType,
        numberDistributors,
        books.map(book =>{
          return {title: book.bookTitle, language: book.bookLanguage, number: book.bookNumber}
        })
      )
        .then(() => {
          this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
          this.setState({ error });
          console.log(this.state.error)
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
          <strong>Instructions:</strong> Fill out the form with the information about the latest
          booksale{" "}
        </h2>
        <form onSubmit={this.onSubmitHandler}>
        <Row>
          <Input
            s = {6}
            value={this.state.date}
            name="date"
            type="date"
            onChange={this.onChangeHandler}
            label="Date"
          />
          <Input
            s = {6}
            value={this.state.numberDistributors}
            name="numberDistributors"
            type="number"
            onChange={this.onChangeHandler}
            label="Number of Distributors"
          />
          <label for="distributionType">Type of Book Distribution </label>
          <select
            value={this.state.distributionType}
            name="distributionType"
            className="browser-default"
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
          {this.state.bookInputs.map((input, index) => 
            <div className = "dynamicBooks">
            <Input
                s = {5}
                name="bookTitle"
                type="text"
                onChange={this.onChangeHandler}
                label="Book Title"
            />
            <Input
                s = {5}
                name="bookLanguage"
                type="text"
                onChange={this.onChangeHandler}
                label="Book Language"
            />
            <Input
                s = {2}
                name="bookNumber"
                type="number"
                onChange={this.onChangeHandler}
                label="Number of Books"
            />
            </div>
          )}
          <Button onClick = {this.appendBookInput}> Add Another Book </Button>
        </Row>
          <div className = "button-container">
            <Button className  = "book-form-button" type="submit">Add Book Data</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default BookForm;
