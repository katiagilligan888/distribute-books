import React from "react";

const INITIAL_STATE = {
    name: '', 
    email: '', 
    country: '', 
    ip: '', 
    lat: '', 
    long: '', 
    os: '', 
    desktop: '', 
}

class GiverForm extends React.Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE
    };
  }

  render() {
    return (
      <div className="giver-form">
        <form>
          <h3> Sign up to Be a Giver </h3>
          <div className="form-group">
            <label for="name">Name </label>
            <input type="text" className="form-control" name = "name"/>
          </div>
          <div className="form-group">
            <label for="email">Email </label>
            <input type="text" className="form-control" name = "email"/>
          </div>
          <div className="form-group">
            <label for="name">Country </label>
            <input type="text" className="form-control" name = "country"/>
          </div>
        </form>
      </div>
    );
  }
}

export default GiverForm;
