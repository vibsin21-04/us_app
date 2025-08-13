import React from 'react';
import './HomePage.css';
import Post from './Post';

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

interface Comment {
  id: number;
  username: string;
  text: string;
}

const HomePage: React.FC = () => {
  // Sample post data
  const samplePosts: PostData[] = [
    {
      id: 3,
      username: "adventure_seeker",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      postImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop",
      caption: "Morning hike to the top! The view was worth every step 🥾⛰️ #hiking #adventure #nature",
      likes: 203,
      comments: [
        { id: 1, username: "mountain_climber", text: "Which trail is this?" },
        { id: 2, username: "outdoor_life", text: "Added to my bucket list!" },
        { id: 3, username: "fitness_guru", text: "Great workout! 💪" }
      ],
      timeAgo: "6 hours ago"
    }
  ];

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="app-title">RELAX</h1>
      </header>
      
      <main className="feed">
        {samplePosts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default HomePage;
