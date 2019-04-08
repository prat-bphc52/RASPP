import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRouteAdm = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      if(auth.isAuthenticated === true){
        if(auth.user.type==="EMP"){
          <Redirect to="/dashboard" />
        }
        else{
          <Component {...props} />  
        }
      }
      else{
        <Redirect to="/login" />
      }
    }
  />
);

PrivateRouteAdm.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRouteAdm);
