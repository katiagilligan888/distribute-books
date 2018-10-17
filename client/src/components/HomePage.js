import React from "react";
import withAuthorization from "./withAuthorization";

const HomePage = () => {
  return (
    <div>

      <div className=" row stats-for-data justify-content-center">
        <div className="statcard statcard-primary p-4 mb-2 col-md-2">
          <h3 className="statcard-number">5</h3>
          <span className="statcard-desc">Books Sold</span>
        </div>
        <div className="statcard statcard-success p-4 mb-2 col-md-2">
          <h3 className="statcard-number">2</h3>
          <span className="statcard-desc"># of Temples</span>
        </div>
        <div className="statcard statcard-danger p-4 mb-2 col-md-2">
          <h3 className="statcard-number">50</h3>
          <span className="statcard-desc"># of Givers</span>
        </div>
        <div className="statcard statcard-info p-4 mb-2 col-md-2">
          <h3 className="statcard-number">5</h3>
          <span className="statcard-desc">Days Left until 1/1/2019</span>
        </div>
      </div>
      <hr />
      <div className="map-and-form row">
        <div className="map col-md-8">
          <p> This is where the map will be located </p>
        </div>
        <div className="form col-md-3">
          <form>
            <h3> Sign up to Be a Giver </h3>
            <div className="form-group">
              <label for="name">Name </label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label for="email">Email </label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label for="name">Country </label>
              <input type="text" className="form-control" />
            </div>
          </form>
        </div>
      </div>

      <hr />
    </div>
  );
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
