import React from "react";
import {Field, reduxForm} from 'redux-form'; 
import { toast } from 'react-toastify'; 
import { db } from "../firebase";

class GiverForm extends React.Component {
  constructor() {
    super();
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
      db.doCreateGiver(values.firstName, values.lastName, values.email, values.country).then(() => {
        toast.info("Thank you for becoming a Giver")
        this.props.reset(); 
      })
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
          <button className = "btn">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'GiverForm'
})(GiverForm);
