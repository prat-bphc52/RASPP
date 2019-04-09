import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, makeAnnouncement } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  createAnnouncement = e =>{
    e.preventDefault();

    console.log(this.props.auth.user)
    const post = {
      uid: this.props.auth.user.email,
      message: "Test Announcement",
      name: this.props.auth.user.name,
      viewers: [{viewer:"viewer1"}]
    };
    // this.props.makeAnnouncement(post);
  };

  render() {
    const { user } = this.props.auth;
    console.log(this.props.auth);
    return (
      <div className="container">
        <div className="sidebar">
          <div className="landing-copy col s1 left-align">
            <h4>
              <b>{user.name.split(" ")[0]}</b>
            </h4>
          </div>
          <div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Edit
            </button>
          </div>
          <div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.createAnnouncement}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Post
            </button>
          </div>
          <div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
              Logout
            </button>
          </div>
        </div>
        <div className="container">
          <h4> Announcements </h4>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  makeAnnouncement: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, makeAnnouncement }
)(Dashboard);
