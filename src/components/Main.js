require('normalize.css/normalize.css');
require('styles/App.scss');
var jQuery = require('jquery');


import React from 'react';

class CommentBox extends React.Component {

  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: []
    };
  }

  componentWillMount() {
    this._fetchComments();
  }

  _deleteComment(commentID) {
    const ROOT_URL = 'http://localhost:3000';
    jQuery.ajax({
      method: 'DELETE',
      url: `${ROOT_URL}/comments/${commentID}`,
      success: () => {
        console.log(`deleted ${commentID}`)
      }
    });

    //optimistic update (before ajax is done)
    const comments = [...this.state.comments];
    let commentIndex;

    comments.map(comment => {
      if(comment.id === commentID){
        commentIndex = comments.indexOf(comment);
      }
    });
    comments.splice(commentIndex, 1);
    this.setState({comments})
  }

  _fetchComments() {
    const ROOT_URL = 'http://localhost:3000';

    jQuery.ajax({
      method: 'GET',
      url: `${ROOT_URL}/comments`,
      success: comments => {
        this.setState({comments})
      }
    });
  }

  _getComments() {
    return this.state.comments.map(comment => {
      return (
        <Comment
          author={comment.author}
          body={comment.body}
          avatarUrl={comment.avatarUrl}
          key={comment.id}
          onDelete={this._deleteComment.bind(this)}
          commentID={comment.id}
          />
      );
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 1) {
      return '1 comment';
    }
    if (commentCount === 0) {
      return 'No comments yet';
    }
    return `${commentCount} comments`;
  }

  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;
    if (commentCount > POPULAR_COUNT) {
      return (
        <p className="popular-count">
          This post is getting really popular!
        </p>
      );
    }
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body
    };
    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show comments';

    if (this.state.showComments) {
      buttonText = 'Hide comments';
      commentNodes = <div className="comment-list"> {comments} </div>;
    }

    return (
      <div className="comment-box">
        <h3>Join the discussion</h3>
        <CommentForm addComment={this._addComment.bind(this)} />
        <h3>Comments</h3>
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        {this._getPopularMessage(comments.length)}
        <button onClick={this._handleClick.bind(this)} >{buttonText}</button>
        {commentNodes}
      </div>
    );
  }
}

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      isAbusive: false
    };
  }

  _toggleAbuse(event) {
    event.preventDefault();
    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }

  _handleDelete(event) {
    event.preventDefault();
    if(confirm(`Do you really want to delete ${this.props.author}' comment?`)){
      this.props.onDelete(this.props.commentID);
    }
  }

  render() {
    let commentBody;
    if (this.state.isAbusive) {
      commentBody = <em>Content marked as abusive</em>;
    } else {
      commentBody = this.props.body;
    }

    return (
      <div className="comment">
        <img
          src={this.props.avatarUrl}
          alt={`${this.props.author}'s comment`} />
        <p className="comment-header">{ this.props.author }</p>
        <p className="comment-body">
          { commentBody }
        </p>
        <div className="comment-actions">
          <a href="#" onClick={this._handleDelete.bind(this)} >Delete comment</a>
          <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>
        </div>
        <hr />
      </div>
    );
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the discussion</label>
        <div className="comment-form-fields">
          <div className="form-elem">
            <input placeholder="Name:" ref={input => this._author = input} />
          </div>
          <div className="form-elem">
            <textarea
              placeholder="Comment:"
              ref={textarea => this._body = textarea}
              onKeyUp={this._getCharacterCount.bind(this)}>
            </textarea>
          </div>
        </div>
        <div className="comment-from-actions">
          <button type="submit">
            Post comment
          </button>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    let author = this._author;
    let body = this._body;

    if(author.value && body.value) {
      this.props.addComment(author.value, body.value);
    } else {
      alert('Please enter your name and comment');
    }

  }

  _getCharacterCount(){
    this.setState({
      characters: this._body.value.length
    });
  }

}

CommentBox.defaultProps = {
};

export default CommentBox;
