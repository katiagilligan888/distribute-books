import React from 'react'; 
import { Input } from "react-materialize";

const INITIAL_STATE = {
    bookTitle: "",
    bookLanguage: "",
    bookNumber: ""
}

class Book extends React.Component{

    constructor(){
        super();
        this.state = {
            ...INITIAL_STATE
        }
    }

    onChangeHandler = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

    render(){
        return(
            <div className = "dynamicBooks">
            <Input
                s = {5}
                value={this.state.bookTitle}
                name="bookTitle"
                type="text"
                onChange={this.onChangeHandler}
                label="Book Title"
            />
            <Input
                s = {5}
                value={this.state.bookLanguage}
                name="bookLanguage"
                type="text"
                onChange={this.onChangeHandler}
                label="Book Language"
            />
            <Input
                s = {2}
                value={this.state.bookNumber}
                name="bookNumber"
                type="number"
                onChange={this.onChangeHandler}
                label="Number of Books"
            />
            </div>
        )
        
    }
}

export default Book; 