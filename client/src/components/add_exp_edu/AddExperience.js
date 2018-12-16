import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
  constructor() {
    super();
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disableToField: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }
  
  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onCheck() {
    this.setState({
      current: !this.state.current,
      disableToField: !this.state.disableToField
    });
  }
  onFormSubmit(e) {
      e.preventDefault();
      const expData = {
        company: this.state.company,
        title: this.state.title,
        location: this.state.location,
        from: this.state.from,
        to: this.state.to,
        current: this.state.current,
        description: this.state.description,
      }
      this.props.addExperience(expData, this.props.history)
    }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }
  
  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position you have had in past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.onFormSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onInputChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onInputChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onInputChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={this.onInputChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.onInputChange}
                  error={errors.to}
                  disabled={this.state.disableToField ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current job
                  </label>
                </div>
                <TextareaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onInputChange}
                  error={errors.description}
                  info="Tell us about the position"
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-block btn-info mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
