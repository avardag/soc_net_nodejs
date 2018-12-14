import React, { Component } from "react";
import "./App.css";
//react router imports
import { BrowserRouter, Route, Switch} from "react-router-dom";
//Redux imports
import { Provider } from 'react-redux';
import store from "./store";
//check isAuthorized
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from "./actions/authActions";
//clear current loaded profile in store after logout
import { clearCurrentProfile } from './actions/profileActions';
//Protect private routes
import PrivateRoute from './components/common/PrivateRoute';
//Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create_profile/CreateProfile';



//PERSIST LOGIN
//check for token
if (localStorage.jwtToken) {
  //set auth token to request headers
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken);
  //set user and isAuthenticated to true
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    //logout user
    store.dispatch(logoutUser());
    //Clear current profile
    store.dispatch(clearCurrentProfile())
    //redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route path="/" component={Landing} exact />
            <div className="container">
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
              <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} exact />
              </Switch>
              <Switch>
                <PrivateRoute path="/create-profile" component={CreateProfile} exact />
              </Switch>
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
