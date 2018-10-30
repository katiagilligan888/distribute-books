import React from "react";
import withAuthorization from "./withAuthorization";
import GiverForm from './GiverForm'; 
import { connect } from 'react-redux'; 
import { setDaysUntil } from '../actions'; 

class HomePage extends React.Component {

  getDaysUntil = () => {
    const obj = setDaysUntil()
    return obj.payload
  }

  render(){
    return (
      <div>
        <div className = "container">
        <div className="row">
          <div class="col-sm-3">
          <div className="statcard statcard-primary p-4 ">
            <h3 className="statcard-number">5</h3>
            <span className="statcard-desc">Books Sold</span>
          </div>
          </div>
          <div class="col-md-3">
          <div className="statcard statcard-success p-4 ">
            <h3 className="statcard-number">2</h3>
            <span className="statcard-desc"># of Temples</span>
          </div>
          </div>
          <div class="col-md-3">
          <div className="statcard statcard-danger p-4 ">
            <h3 className="statcard-number">50</h3>
            <span className="statcard-desc"># of Givers</span>
          </div>
          </div>
          <div class="col-md-3">
          <div className="statcard statcard-info p-4 ">
            <h3  className="statcard-number">{this.getDaysUntil()}</h3>
            <span className="statcard-desc">Days Left until 1/1/2019</span>
          </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-8">
          </div>
          <div className="col-md-4">
            <GiverForm />
          </div>
        </div>
        <hr />
        </div>
      </div>
    );
  }
  
};


export default connect(null, { setDaysUntil })(HomePage);
