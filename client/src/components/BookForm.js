import React from 'react'; 
import {Input, Button} from 'react-materialize'; 
import { db, auth} from '../firebase'; 
import firebase from 'firebase'; 
import * as routes from "../constants/routes";

const INITIAL_STATE = {
            date: '', 
            distributionType: '', 
            numberDistributors: '',
            bookTitle: '', 
            bookLanguage: '', 
            bookNumber: ''
}

class BookForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...INITIAL_STATE
        }
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitHandler = (event) => {
        const {date, distributionType, numberDistributors, bookTitle, bookLanguage, bookNumber} = this.state;
        event.preventDefault(); 
        const user = firebase.auth().currentUser;
        if(user){
            db.doCreateBook(user.uid, date, distributionType, numberDistributors, bookTitle, bookLanguage, bookNumber)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(routes.HOME);
          })
          .catch(error => {
            this.setState({error});
          });
        }
        
    }

    render(){
        return(
            <div className = 'bookform'>
            <h1> Book Form </h1>
            <h2> Instructions: Fill out the form with the information about the latest booksale </h2>
            <form onSubmit = {this.onSubmitHandler}>
                <Input name = "date" type = "date" onChange = {this.onChangeHandler} label = "Date" />
                <label for= 'distributionType'>Type of Book Distribution </label>
                <select name ="distributionType" className="browser-default" onChange = {this.onChangeHandler}>
                    <option value = "" disabled selected>Choose Your Distribution Type </option>
                    <option value = "option 1"> Option 1 </option>
                    <option value = "option 2"> Option 2</option>
                    <option value = "option 3"> Option 3 </option>
                    <option value = "option 4"> Option 4 </option>
                </select>
                <Input name ="numberDistributors" type = "number" onChange = {this.onChangeHandler} label = "Number of Distributors" />
                <Input name = "bookTitle" type = "text" onChange = {this.onChangeHandler} label = "Book Title" />
                <Input name = "bookLanguage" type = "text" onChange = {this.onChangeHandler} label = "Book Language" />
                <Input name = "bookNumber" type = "number" onChange = {this.onChangeHandler} label = "Number of Books" />
                <Button type = "submit">Add Book Data</Button>
            </form>
            </div>
        )
    }
}

export default BookForm; 