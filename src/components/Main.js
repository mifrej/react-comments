require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';


class CommentBox extends React.Component {

  constructor() {
    super();

    this.state = {
      showComments: false
    };

  }

  _getComments() {

    const commentList = [
      { id: 1, author: 'Mick Griffin', body: 'What is love ?', avatarUrl: '../images/yeoman.png' },
      { id: 2, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png' },
      { id: 3, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png' },
      { id: 4, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png' },
      { id: 5, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png' },
      { id: 6, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png' },
      { id: 7, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png' },
      { id: 8, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png' },
      { id: 9, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png' },
      { id: 10, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png' },
      { id: 11, author: 'John Doe', body: 'Baby don\'t hurt me', avatarUrl: '../images/yeoman.png' }
    ];

    return commentList.map( (comment) => {
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
      return  '1 comment';
    }
    else if (commentCount === 0) {
      return 'No comments yet';
    }
    else {
      return `${commentCount} comments`;
    }
  }

  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10
    if(commentCount > POPULAR_COUNT) {
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
  render() {
    return (
      <div className="comment">
        <img src={this.props.avatarUrl} alt={`${this.props.author}'s comment`} />
        <p className="comment-header">{ this.props.author }</p>
        <p className="comment-body">
          { this.props.body }
        </p>
        <div className="comment-actions">
          <a href="#">Delete comment</a>
        </div>
        <hr />
      </div>
    );
  }
}

CommentBox.defaultProps = {
};

export default CommentBox;
