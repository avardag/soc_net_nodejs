import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
//redux action for props
import { createProfile } from "../../actions/profileActions";
//import withRouter to be able to redirect or push history with redux state
import { withRouter } from 'react-router-dom';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubUsername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubUsername: this.state.githubUsername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    }
    this.props.createProfile(profileData, this.props.history)
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //if redux action gets errors, will be set to props.errors
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }
  
  render() {
    const { errors, displaySocialInputs } = this.state;
    const options = [
      { label: "* Select Proffessional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.onFormSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onInputChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your name, company name, nickname, etc"
                />
                <SelectListGroup
                  options={options}
                  name="status"
                  value={this.state.status}
                  onChange={this.onInputChange}
                  error={errors.status}
                  info="Where are you at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onInputChange}
                  error={errors.company}
                  info="Your own , or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onInputChange}
                  error={errors.website}
                  info="Your own , or your company website"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onInputChange}
                  error={errors.location}
                  info="City, or city & Country"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onInputChange}
                  error={errors.skills}
                  info="Please use comma separated values(eg. HTML, CSS, JS, Elixir)"
                />
                <TextareaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onInputChange}
                  error={errors.bio}
                  info="Tell us little about yourself"
                />

                <div className="mb-3">
                  <button
                    type='button'
                    className="btn btn-light"
                    onClick={() => this.setState(prevState=>({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }))}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                
                {displaySocialInputs && (<div>
                  <InputGroup
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    value={this.state.facebook}
                    onChange={this.onInputChange}
                    error={errors.facebook}
                    icon="fab fa-facebook"
                  />
                  <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    value={this.state.twitter}
                    onChange={this.onInputChange}
                    error={errors.twitter}
                    icon="fab fa-twitter"
                  />
                  <InputGroup
                    placeholder="LinkedIn Profile URL"
                    name="linkedin"
                    value={this.state.linkedin}
                    onChange={this.onInputChange}
                    error={errors.linkedin}
                    icon="fab fa-linkedin"
                  />
                  <InputGroup
                    placeholder="YouTube channel URL"
                    name="youtube"
                    value={this.state.youtube}
                    onChange={this.onInputChange}
                    error={errors.youtube}
                    icon="fab fa-youtube"
                  />
                  <InputGroup
                    placeholder="Instagram Page URL"
                    name="instagram"
                    value={this.state.instagram}
                    onChange={this.onInputChange}
                    error={errors.instagram}
                    icon="fab fa-instagram"
                  />
                </div>)}

                <input type="submit" value="Submit" className="btn btn-block btn-info mt-4"/>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {createProfile}
)(withRouter(CreateProfile));
