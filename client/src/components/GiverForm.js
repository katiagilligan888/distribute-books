import React from "react";
import {Field, reduxForm} from 'redux-form'; 
import Recaptcha from 'react-recaptcha';  
import { toast } from 'react-toastify'; 
import { db } from "../firebase";

class GiverForm extends React.Component {
  constructor() {
    super();
    this.state = {
      isVerified: false
    }
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
          <span className="error">{field.meta.error}</span>
        ) : (
          ""
        )}
      </div>
    );
  }

  onSubmit = (values) => {
    if(this.state.isVerified){
      db.doCreateGiver(values.firstName, values.lastName, values.email, values.country).then(() => {
        toast.info("Thank you for becoming a Giver")
        this.props.reset(); 
      })
    }else {
      toast.info("Confirm you are human to submit form!")
    }
  }

  verifyCallback = () => {
    this.setState({ isVerified: true})
  }

  render() {
    return (
      <div className="giver-form">
        <form onSubmit = {this.props.handleSubmit(this.onSubmit)}>
          <h3> Sign up to Be a Giver </h3>
          <Field name = "firstName" label = "First Name" inputType = "text" component = {this.renderField} />
          <Field name = "lastName" label = "Last Name" inputType = "text" component = {this.renderField} />
          <Field name = "email" label = "Email" inputType = "text" component = {this.renderField} />
          <Field name = "country" label = "Country" inputType = "text" component = {this.renderField} />
          <Recaptcha
            sitekey="6Ldtg3YUAAAAAHj5KFlLRPBFIT_QGhoBcXTgKwPw"
            render="explicit"
            theme= "dark"
            verifyCallback = {this.verifyCallback}
          />
          <button className = "btn btn-primary btn-pill">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'GiverForm'
})(GiverForm);
