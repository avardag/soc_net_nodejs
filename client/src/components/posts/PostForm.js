import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(){
    super()
    this.state = {
      text: '',
      errors: {}
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  onInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onFormSubmit(e){
    e.preventDefault()
    const newPost = {
      text: this.state.text,
      name: this.props.auth.user.name,
      avatar: this.props.auth.user.avatar
    }
    this.props.addPost(newPost);
    this.setState({text: ''})
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }
  
  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Something...
          </div>
          <div className="card-body">
            <form onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <TextareaFieldGroup  
                  placeholder="Create a post"
                  name='text'
                  value={this.state.text}
                  onChange={this.onInputChange}
                  error={this.state.errors.text}
                  />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state)=>({
  auth: state.auth,
  errors: state.errors,
  post: state.post
})

export default connect(mapStateToProps, {addPost})(PostForm);