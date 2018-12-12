import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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

  onFormSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  componentWillReceiveProps(nextProps) {  
    //if errors from errorReducer, put it to component state
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
    if(nextProps.auth.isAuthenticated){
      this.props.history.push("/dashboard");
    }
  }
  //if authenticated dont allow to see this page, redirect
  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard");
    }
  }
  
  render() {
    const {errors} = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Soc_Set account
              </p>
              <form onSubmit={this.onFormSubmit}>
                <TextFieldGroup
                  type="email"
                  error={errors.email}
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                  />
                <TextFieldGroup
                  type="password"
                  error={errors.password}
                  placeholder="Email Address"
                  name="password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                  />
                
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) =>({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login);
