import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextareaFieldGroup from '../common/TextareaFieldGroup';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
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
    const newComment = {
      text: this.state.text,
      name: this.props.auth.user.name,
      avatar: this.props.auth.user.avatar
    }
    this.props.addComment(this.props.postId, newComment);
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
            Make a comment ..
          </div>
          <div className="card-body">
            <form onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <TextareaFieldGroup  
                  placeholder="Reply to post"
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state)=>({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {addComment})(CommentForm);