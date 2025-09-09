const mongoose = require('mongoose');
const Post = require('./models/Post');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social_media_app';

// Sample data for testing
const samplePosts = [
  // RELAX category
  {
    category: 'RELAX',
    title: 'Peaceful Beach Sunset',
    link: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    caption: 'Take a moment to breathe and enjoy this beautiful sunset 🌅',
    likes: 23
  },
  {
    category: 'RELAX',
    title: 'Mountain Lake',
    link: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=500',
    caption: 'Serene mountain lake perfect for meditation 🏔️',
    likes: 45
  },
  {
    category: 'RELAX',
    title: 'Cozy Reading Nook',
    link: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500',
    caption: 'Perfect spot for a quiet afternoon with a good book 📚',
    likes: 12
  },

  // LEARN category
  {
    category: 'LEARN',
    title: 'JavaScript Tips',
    link: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500',
    caption: 'Did you know? JavaScript array methods can be chained for powerful data manipulation! 💻',
    likes: 67
  },
  {
    category: 'LEARN',
    title: 'Space Facts',
    link: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500',
    caption: 'Fun fact: One day on Venus is longer than its year! 🌌',
    likes: 89
  },
  {
    category: 'LEARN',
    title: 'Photography Basics',
    link: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500',
    caption: 'Rule of thirds: Divide your frame into 9 sections for better composition 📸',
    likes: 34
  },

  // LAUGH category
  {
    category: 'LAUGH',
    title: 'Cat Logic',
    link: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500',
    caption: 'When you buy your cat an expensive bed but they prefer the cardboard box 😸',
    likes: 156
  },
  {
    category: 'LAUGH',
    title: 'Monday Mood',
    link: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500',
    caption: 'Me trying to adult on Monday morning ☕😴',
    likes: 78
  },
  {
    category: 'LAUGH',
    title: 'Programmer Humor',
    link: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500',
    caption: 'When your code works on the first try... something must be wrong 🤔💻',
    likes: 203
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB (Atlas or Local)
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Check if using Atlas
    if (MONGODB_URI.includes('mongodb+srv')) {
      console.log('☁️  Seeding MongoDB Atlas (Cloud)');
    } else {
      console.log('💻 Seeding Local MongoDB');
    }
    
    // Clear existing posts
    await Post.deleteMany({});
    console.log('🗑️  Cleared existing posts');
    
    // Insert sample posts
    const insertedPosts = await Post.insertMany(samplePosts);
    console.log(`📝 Inserted ${insertedPosts.length} sample posts`);
    
    // Display summary
    const postCounts = await Promise.all([
      Post.countDocuments({ category: 'RELAX' }),
      Post.countDocuments({ category: 'LEARN' }),
      Post.countDocuments({ category: 'LAUGH' })
    ]);
    
    console.log('\n📊 Post Summary:');
    console.log(`   RELAX: ${postCounts[0]} posts`);
    console.log(`   LEARN: ${postCounts[1]} posts`);
    console.log(`   LAUGH: ${postCounts[2]} posts`);
    console.log(`   Total: ${postCounts[0] + postCounts[1] + postCounts[2]} posts`);
    
    console.log('\n✨ Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
