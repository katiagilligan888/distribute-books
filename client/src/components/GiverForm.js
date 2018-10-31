import React from "react";
import {Field, reduxForm} from 'redux-form'; 
import Recaptcha from 'react-recaptcha';  
import { toast } from 'react-toastify'; 
import { db } from "../firebase";
import giverLogo from '../giver_logo.png'; 

class GiverForm extends React.Component {
  constructor() {
    super();
    this.state = {
      coords: '',
    };
  }

  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ coords: position.coords });
    }, (err) => {
      console.log('Geolocation blocked: ' + err);
    })
  }

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
          <span className="text-danger">{field.meta.error}</span>
        ) : (
          ""
        )}
      </div>
    );
  }

  onSubmit = (values) => {
    db.doCreateGiver(values.firstName, values.lastName, values.email, values.country).then(() => {
      toast.info("Thank you for becoming a Giver")
      this.props.reset(); 
    })
    }

  render() {
    return (
      <div className="giver-form">
        <img className = "giver-logo" src = {giverLogo} />
        <form className = "giver-form" onSubmit = {this.props.handleSubmit(this.onSubmit)}>
          <Field name = "firstName" label = "First Name" inputType = "text" component = {this.renderField} />
          <Field name = "lastName" label = "Last Name" inputType = "text" component = {this.renderField} />
          <Field name = "email" label = "Email" inputType = "text" component = {this.renderField} />
          <Field name = "country" label = "Country" inputType = "text" component = {this.renderField} />
          <button className = "btn btn-primary mx-auto d-block">Sign Up</button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {}
  if(!values.firstName){
    errors.firstName = "Please enter name"
  }else if(values.firstName.length < 3){
    errors.firstName = "First name needs to be at least 3 characters"
  }else if(values.firstName > 20){
    errors.firstName = "First name can't exceed 20 characters"
  }

  if(!values.lastName){
    errors.lastName = "Please enter name"
  }else if(values.lastName.length < 3){
    errors.lastName = "Last name needs to be at least 3 characters"
  }else if(values.lastName > 25){
    errors.lastName = "Last name can't exceed 25 characters"
  }

  if(!values.email){
    errors.email = "Please enter email"
  }

  if(!values.country){
    errors.country = "Please enter country"
  }

  return errors;
}

export default reduxForm({
  validate, 
  form: 'GiverForm'
})(GiverForm);
