import React from "react";
import {Row, Input, Button } from "react-materialize";
import { db, auth } from "../firebase";
import firebase from "firebase";
import * as routes from "../constants/routes";
import Book from "./Book";

const INITIAL_STATE = {
  date: "",
  distributionType: "",
  numberDistributors: "",
  bookInputs: ['book-0']
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

  appendBookInput = () => {
    this.setState({
      bookInputs: this.state.bookInputs.concat([`input-${this.state.bookInputs.length}`])
    })
  }

  onSubmitHandler = event => {
    const {
      date,
      distributionType,
      numberDistributors,
      bookTitle,
      bookLanguage,
      bookNumber
    } = this.state;
    event.preventDefault();
    const user = firebase.auth().currentUser;
    // if (user) {
    //   db.doCreateBook(
    //     user.uid,
    //     date,
    //     distributionType,
    //     numberDistributors,
    //     bookTitle,
    //     bookLanguage,
    //     bookNumber
    //   )
    //     .then(() => {
    //       this.setState({ ...INITIAL_STATE });
    //       this.props.history.push(routes.HOME);
    //     })
    //     .catch(error => {
    //       this.setState({ error });
    //     });
    // }
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
          {this.state.bookInputs.map((input, index) => <Book key = {index} />)}
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
