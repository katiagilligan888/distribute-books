import React from "react";
import withAuthorization from "./withAuthorization";
import GiverForm from "./GiverForm";
import { connect } from "react-redux";
import { setDaysUntil, fetchingGivers } from "../actions";
import YouTube from 'react-youtube';
import GiverMap from "./GiverMap";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.setDaysUntil();
    this.props.fetchingGivers();
  };

  render() {
    const opts = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

  const wrapper = {
    position: 'relative', 
    'padding-bottom': '56.25%', /* 16:9 */ 
    'padding-top': '25px', 
    height: '0'}

    return (
      <div className="container margin-header">
      <GiverMap />
        {/* <div className="row statcards">
          <div className="col-md-3">
            <div className="statcard statcard-primary p-4">
              <h3 className="statcard-number">5</h3>
              <span className="statcard-desc">Books Sold</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="statcard statcard-info p-4">
              <h3 className="statcard-number">2</h3>
              <span className="statcard-desc"># of Temples</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="statcard statcard-warning p-4">
              <h3 className="statcard-number">{this.props.givers.length}</h3>
              <span className="statcard-desc"># of Givers</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="statcard statcard-danger p-4">
              <h3 className="statcard-number">{this.props.daysUntil}</h3>
              <span className="statcard-desc">Days until 1/2019</span>
            </div>
          </div>
        </div>
        <hr /> */}
        <div className="row">
          <div className="col-md-8 mb-4">
            <YouTube
                videoId="VU2k4X1hsI4"
                opts={opts}
              />
          </div>
          <div className="col-md-4">
            <GiverForm />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    givers: state.appReducer.givers,
    daysUntil: state.appReducer.daysUntil
  };
};

export default connect(
  mapStateToProps,
  { setDaysUntil, fetchingGivers }
)(HomePage);
