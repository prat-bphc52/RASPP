import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class DashboardAdmin extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  addemp = e => {
    e.preventDefault();
    this.props.history.push("/register");
  };

  render() {
    const { user } = this.props.auth;
    console.log(this.props.auth);
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into{" "}
                <span style={{ fontFamily: "monospace" }}> ADMIN PANEL</span> 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
            <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                marginLeft: "2rem"
              }}
              onClick={this.addemp}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
    );
  }
}

DashboardAdmin.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(DashboardAdmin);
