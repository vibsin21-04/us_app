import React, { useState } from 'react';
import './Post.css';
import { Post as ApiPost } from '../services/apiService';
import ApiService from '../services/apiService';

interface PostProps {
  post: ApiPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(post.likes);

  const handleLike = async () => {
    try {
      let newLikeCount: number;
      
      if (isLiked) {
        newLikeCount = currentLikes - 1;
        setIsLiked(false);
      } else {
        newLikeCount = currentLikes + 1;
        setIsLiked(true);
      }
      
      setCurrentLikes(newLikeCount);
      
      // Update database
      await ApiService.updateLikes(post._id, newLikeCount);
      console.log(`Updated post ${post._id} likes to ${newLikeCount}`);
      
    } catch (error) {
      console.error('Failed to update likes:', error);
      // Revert on error
      setIsLiked(!isLiked);
      setCurrentLikes(currentLikes);
    }
  };

  return (
    <div className="post">
      {/* Post Image */}
      <div className="post-image-container">
        <img 
          src={post.link} 
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
