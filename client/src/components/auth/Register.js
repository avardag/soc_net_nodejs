import React, { Component } from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";
//raect-router imports
import { withRouter } from 'react-router-dom';
//REDUX imports
import { connect } from "react-redux";
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  //if errors from errorReducer, put it to component state
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }
  
  onFormSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    //registerUser redux action.
    //takes newUser info, this.props.history to use redirect within action
    this.props.registerUser(newUser, this.props.history)
  }
  render() {

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Soc_Set account</p>
              <form onSubmit={this.onFormSubmit} noValidate>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onInputChange}
                  />
                  {this.state.errors.name && (
                    <div className="invalid-feedback">
                      {this.state.errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onInputChange}
                  />
                  {this.state.errors.email && (
                    <div className="invalid-feedback">
                      {this.state.errors.email}
                    </div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onInputChange}
                  />
                  {this.state.errors.password && (
                    <div className="invalid-feedback">
                      {this.state.errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onInputChange}
                  />
                  {this.state.errors.password2 && (
                    <div className="invalid-feedback">
                      {this.state.errors.password2}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
   registerUser: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) =>{
  return {
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
