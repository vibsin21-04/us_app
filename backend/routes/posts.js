const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET /api/posts - Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ created_time: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching all posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:category - Get posts by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const validCategories = ['RELAX', 'LEARN', 'LAUGH'];
    
    if (!validCategories.includes(category.toUpperCase())) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    const posts = await Post.find({ 
      category: category.toUpperCase() 
    }).sort({ created_time: -1 });
    
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    res.status(500).json({ error: 'Failed to fetch posts by category' });
  }
});

// POST /api/posts - Create a new post
router.post('/', async (req, res) => {
  try {
    const { category, title, link, caption, likes } = req.body;
    
    // Validation
    if (!category || !link || !caption) {
      return res.status(400).json({ 
        error: 'Missing required fields: category, link, and caption are required' 
      });
    }
    
    const validCategories = ['RELAX', 'LEARN', 'LAUGH'];
    if (!validCategories.includes(category.toUpperCase())) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    const newPost = new Post({
      category: category.toUpperCase(),
      title,
      link,
      caption,
      likes: likes || 0
    });
    
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// PUT /api/posts/:id/like - Update post likes
router.put('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;
    
    if (typeof likes !== 'number') {
      return res.status(400).json({ error: 'Likes must be a number' });
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes },
      { new: true }
    );
    
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating likes:', error);
    res.status(500).json({ error: 'Failed to update likes' });
  }
});

// DELETE /api/posts/:id - Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedPost = await Post.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;
