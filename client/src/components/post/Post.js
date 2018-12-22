import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';


class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
  }
  
  render() {
    const {post, loading} = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length < 1) {
      postContent = <Spinner/>
    } else {
      postContent = (
        <div>
          <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-2">
                <a href="profile.html">
                  <img
                    className="rounded-circle d-none d-md-block"
                    src={post.avatar}
                    alt=""
                  />
                </a>
                <br />
                <p className="text-center">{post.name}</p>
              </div>
              <div className="col-md-10">
                <p className="lead">{post.text} </p>
              </div>
            </div>
          </div>
          <CommentForm postId={post._id}/>
          <CommentFeed postId={post._id} comments={post.comments}/>
        </div>
      )
    }
    return (
      <div className="post">
        <div className="contaner">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back to Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStatToProps = (state) =>({
  post: state.post
})
export default connect(mapStatToProps, { getPost })(Post);