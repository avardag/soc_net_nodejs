import React, { Component } from "react";
import "./App.css";
//react router imports
import { BrowserRouter, Route } from "react-router-dom";
//Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route path="/" component={Landing} exact />
          <div className="container">
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
