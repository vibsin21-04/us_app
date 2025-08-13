import React, { useState } from 'react';
import './Post.css';

interface Comment {
  id: number;
  username: string;
  text: string;
}

interface PostData {
  id: number;
  username: string;
  userAvatar: string;
  postImage: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timeAgo: string;
}

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        username: 'you',
        text: newComment.trim()
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post">
      {/* Post Image */}
      <div className="post-image-container">
        <img 
          src={post.postImage} 
          alt="Post content"
          className="post-image"
        />
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <div className="user-actions">
          <div className="user-info">
            <img 
              src={post.userAvatar} 
              alt={`${post.username}'s avatar`}
              className="user-avatar"
            />
            <span className="username">{post.username}</span>
          </div>
          <div className="action-buttons">
            <button 
              className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              {isLiked ? '♥' : '♡'}
            </button>
            <button className="action-btn comment-btn" onClick={toggleComments}>
              <div className="chat-icon">
                <div className="chat-bubble">
                  <div className="chat-lines"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="post-caption">
        <span className="caption-text">{post.caption}</span>
      </div>

      {/* Comments Section */}
      {comments.length > 0 && (
        <div className="comments-preview">
          <button className="view-comments-btn" onClick={toggleComments}>
            {showComments ? 'Hide comments' : `View all ${comments.length} comments`}
          </button>
        </div>
      )}

      {showComments && (
        <div className="comments-section">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <span className="comment-username">{comment.username}</span>
              <span className="comment-text">{comment.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Add Comment */}
      <form className="add-comment" onSubmit={handleComment}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
        />
        <button 
          type="submit" 
          className="post-comment-btn"
          disabled={!newComment.trim()}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
