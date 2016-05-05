require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

class CommentBox extends React.Component {

  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: [
        {id: 1, author: 'Mick Griffin', body: 'What is love ?', avatarUrl: '../images/yeoman.png'},
        {id: 2, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png'},
        {id: 3, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png'},
        {id: 4, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png'},
        {id: 5, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png'},
        {id: 6, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png'},
        {id: 7, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png'},
        {id: 8, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png'},
        {id: 9, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png'},
        {id: 10, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png'},
        {id: 11, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png'}
      ]
    };
  }

  _getComments() {

    return this.state.comments.map(comment => {
      return (
        <Comment
          author={comment.author}
          body={comment.body}
          avatarUrl={comment.avatarUrl}
          key={comment.id}
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
          <a href="#">Delete comment</a>
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
            <textarea placeholder="Comment:" ref={textarea => this._body = textarea} >
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

    this.props.addComment(author.value, body.value);
  }

}

CommentBox.defaultProps = {
};

export default CommentBox;
