import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Post from './Post';
import ApiService, { Post as ApiPost, PostCategory } from '../services/apiService';

type Mode = 'RELAX' | 'LEARN' | 'LAUGH';

const HomePage: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<Mode>('RELAX');
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const modes: Mode[] = ['RELAX', 'LEARN', 'LAUGH'];
  
  const cycleMode = () => {
    const currentIndex = modes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setCurrentMode(modes[nextIndex]);
  };

  // Fetch posts when component mounts or mode changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const fetchedPosts = await ApiService.getPostsByCategory(currentMode as PostCategory);
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentMode]);



  return (
    <div className="home-page">
      <header className="header">
        <h1 className="app-title" onClick={cycleMode}>
          {currentMode}
        </h1>
      </header>
      
      <main className="feed">
        {loading && (
          <div className="loading">Loading posts...</div>
        )}
        
        {error && (
          <div className="error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        )}
        
        {!loading && !error && posts.length === 0 && (
          <div className="no-posts">No posts found for {currentMode}</div>
        )}
        
        {!loading && !error && posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default HomePage;
