import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import PrivateRouteAdm from "./components/private-route/PrivateRouteAdm";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardAdmin from "./components/dashboard/DashboardAdmin";
import Announcement from "./components/dashboard/Announcement";
import CreateAnnouncement from "./components/dashboard/CreateAnnouncement";
import Project from "./components/dashboard/Project";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <h1 align = "center">RASPP</h1>
            <h5 align = "center">Company Communication System</h5>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/Announcement" component={Announcement}/>
            <Route exact path="/create" component={CreateAnnouncement}/>
            <Route exact path="/project" component={Project}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRouteAdm exact path="/dashboardadmin" component={DashboardAdmin} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
//<Navbar />
