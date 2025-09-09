# Social Media Backend API

Node.js/Express backend with MongoDB for the social media application.

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** running locally on port 27017
3. **npm** or **yarn**

## Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
Create a `.env` file in the backend directory:
```bash
PORT=5340
MONGODB_URI=mongodb://localhost:27017/social_media_app
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running on your laptop:
```bash
# On Windows (if MongoDB is installed)
mongod

# On macOS (with Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

### 4. Seed Sample Data (Optional)
```bash
npm run seed
```

### 5. Start the Server
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

The server will start on `http://localhost:5340`

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:category` - Get posts by category (RELAX, LEARN, LAUGH)
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id/like` - Update post likes
- `DELETE /api/posts/:id` - Delete post

### Example Usage

**Get posts by category:**
```bash
curl http://localhost:5340/api/posts/RELAX
```

**Create a new post:**
```bash
curl -X POST http://localhost:5340/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "category": "LEARN",
    "title": "Cool Fact",
    "link": "https://example.com/image.jpg",
    "caption": "This is interesting!",
    "likes": 0
  }'
```

## Database Schema

### Post Model
```javascript
{
  _id: ObjectId,
  category: String, // 'RELAX' | 'LEARN' | 'LAUGH'
  title: String,    // Optional
  link: String,     // Required - image URL
  caption: String,  // Required
  likes: Number,    // Default: 0
  created_time: Date // Default: now
}
```

## Frontend Integration

Your React frontend is already configured to work with this backend. The API service expects the backend to run on port 5340, which matches this setup.

## Troubleshooting

### MongoDB Connection Issues
1. Ensure MongoDB is running: `mongod`
2. Check if port 27017 is available
3. Verify MongoDB URI in `.env` file

### Port Conflicts
If port 5340 is busy, change the PORT in `.env` and update your React app's API_BASE_URL.

### CORS Issues
The server includes CORS middleware to allow requests from your React frontend.
