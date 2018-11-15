import React from "react";
import withAuthorization from "./withAuthorization";
import GiverForm from "./GiverForm";
import { connect } from "react-redux";
import { setDaysUntil, fetchingGivers, getUsers, getBookScores } from "../actions";
import YouTube from 'react-youtube';
import GiverMap from "./GiverMap";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.setDaysUntil();
    this.props.fetchingGivers();
    this.props.getUsers();
    this.props.getBookScores();

    //set the script for the curator.io
    const script = document.createElement('script');
    const scriptText = document.createTextNode("(function(){ var i, e, d = document, s = 'script';i = d.createElement('script');i.async = 1;i.src = 'https://cdn.curator.io/published/9368039f-d533-4c2c-b3e7-c32021b31f88.js';e = d.getElementsByTagName(s)[0];e.parentNode.insertBefore(i, e);})();");
    script.appendChild(scriptText);
    document.head.appendChild(script);
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
        <div className="hr-divider">
          <h3 className="hr-divider-content hr-divider-heading">
            Quick stats
          </h3>
        </div>
        <div className="row statcards">
          <div className="col-md-3">
            <div className="statcard statcard-primary p-4">
              <h3 className="statcard-number">{this.props.totalScore}</h3>
              <span className="statcard-desc">Books Distributed</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="statcard statcard-info p-4">
              <h3 className="statcard-number">{this.props.users.length}</h3>
              <span className="statcard-desc">Participating Temples</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="statcard statcard-warning p-4">
              <h3 className="statcard-number">{this.props.givers.length}</h3>
              <span className="statcard-desc">Givers</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="statcard statcard-danger p-4">
              <h3 className="statcard-number">{this.props.daysUntil}</h3>
              <span className="statcard-desc">Days until 1/1/2019</span>
            </div>
          </div>
        </div>
        <hr />
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
        <div className="hr-divider">
          <h3 className="hr-divider-content hr-divider-heading">
            Map of Givers
          </h3>
        </div>
        <GiverMap givers = {this.props.givers}/>
        <div className="hr-divider">
          <h3 className="hr-divider-content hr-divider-heading">
            Social
          </h3>
        </div>
        <div id="curator-feed">
            {/* <a href="https://curator.io" target="_blank" className="crt-logo crt-tag">Powered by Curator.io</a> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    givers: state.appReducer.givers,
    daysUntil: state.appReducer.daysUntil,
    users: state.appReducer.users,
    totalScore: state.appReducer.totalScore
  };
};

export default connect(
  mapStateToProps,
  { setDaysUntil, fetchingGivers, getUsers , getBookScores }
)(HomePage);
