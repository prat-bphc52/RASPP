import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Announcement extends Component {

	render()
	{
		const { user } = this.props.auth;
		return (
			<div className="container">
			<h5> Hello,
			<b>{user.name.split(" ")[0]}</b>
			</h5>
			<h6> Your announcements are </h6>
			<ul>
			<li> 11th April is declared as holiday </li>
			<li> Announcement 2 </li>
			</ul> 
			</div>
		);	
	}
}

Announcement.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
	mapStateToProps
)(Announcement);