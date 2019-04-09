import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
 
 class Project extends Component{
  render()
  {
   const { user } = this.props.auth;
   return(
    <div className="container">
    <h5> Hello,
    <b>{user.name.split(" ")[0]}</b>
    </h5>
    <h6>Your ongoing projects are: </h6>
    <ul>
    <li> Software Development </li>
    <li> Disaster Management Report </li>
    </ul>
    </div>
   );
  }
}
 Project.propTypes = {
  auth: PropTypes.object.isRequired
 }
 const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  )(Project);
 