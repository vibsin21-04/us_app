// API Service for communicating with the backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5340/api';

export interface Post {
  _id: string;
  category: 'RELAX' | 'LEARN' | 'LAUGH';
  title?: string;
  link: string;
  caption: string;
  likes: number;
  created_time: string;
}

export type PostCategory = 'RELAX' | 'LEARN' | 'LAUGH';

class ApiService {
  
  // Get all posts
  static async getAllPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all posts:', error);
      throw error;
    }
  }

  // Get posts by category
  static async getPostsByCategory(category: PostCategory): Promise<Post[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      throw error;
    }
  }

  // Create a new post
  static async createPost(postData: {
    category: PostCategory;
    title?: string;
    link: string;
    caption: string;
    likes?: number;
  }): Promise<Post> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Update post likes
  static async updateLikes(postId: string, newLikeCount: number): Promise<Post> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: newLikeCount }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating likes:', error);
      throw error;
    }
  }

  // Delete a post
  static async deletePost(postId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  // Health check
  static async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error with health check:', error);
      throw error;
    }
  }
}

export default ApiService;
