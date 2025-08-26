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

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
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

      {/* Caption with Like Button */}
      <div className="post-caption">
        <span className="caption-text">{post.caption}</span>
        <button 
          className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          ♥
        </button>
      </div>
    </div>
  );
};

export default Post;
