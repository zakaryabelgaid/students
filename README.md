# Teacher Platform

A comprehensive teacher platform built with Node.js, Express, MongoDB, and EJS. This platform provides a complete solution for managing lessons, news articles, and student Q&A interactions.

## Features

### 🎓 Lesson Management
- Two-level categorization system (First Year/Second Year)
- File upload support for lesson materials (PDF, images, videos)
- Organized lesson display with progress tracking
- Category-based organization

### 📰 News & Articles
- News creation and management
- Pagination for news listings
- Category and tag system
- View tracking

### 💬 Q&A Forum
- Student question submission
- Admin question management dashboard
- Gmail integration for answering questions
- Question status tracking (pending/answered)

### 👨‍💼 Admin Dashboard
- Overview statistics
- Quick action panels
- Pending questions notification
- Content management interface

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **View Engine**: EJS
- **File Upload**: Multer
- **Authentication**: Express Session
- **Styling**: Custom CSS with gradient design system

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/teacher-platform
   SESSION_SECRET=your-secret-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system. If using a local installation:
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Creating an Admin User

To create an admin user, you can use MongoDB directly or create a script:

```javascript
const User = require('./models/User');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/teacher-platform')
  .then(async () => {
    const admin = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123', // Will be hashed automatically
      role: 'admin'
    });
    await admin.save();
    console.log('Admin user created!');
    process.exit();
  });
```

Or use MongoDB shell:
```javascript
use teacher-platform
db.users.insertOne({
  name: "Admin",
  email: "admin@example.com",
  password: "$2a$10$...", // bcrypt hash of your password
  role: "admin",
  createdAt: new Date()
})
```

## Project Structure

```
teacher-platform/
├── models/              # Mongoose models
│   ├── User.js
│   ├── Lesson.js
│   ├── NewsArticle.js
│   └── Question.js
├── controllers/         # Route controllers
│   ├── authController.js
│   ├── lessonController.js
│   ├── newsController.js
│   ├── questionController.js
│   └── adminController.js
├── views/               # EJS templates
│   ├── partials/
│   ├── lessons/
│   ├── news/
│   ├── qa/
│   └── admin/
├── routes/              # Express routes
│   ├── index.js
│   ├── lessons.js
│   ├── news.js
│   ├── qa.js
│   └── admin.js
├── public/              # Static files
│   ├── css/
│   ├── js/
│   ├── images/
│   └── uploads/
├── middleware/          # Custom middleware
│   ├── auth.js
│   ├── upload.js
│   └── sessionLocals.js
├── config/              # Configuration files
│   └── database.js
├── server.js            # Main application file
└── package.json
```

## API Endpoints

### Public Routes
- `GET /` - Home page
- `GET /lessons` - All lessons
- `GET /lessons/level/:level` - Lessons by level (1 or 2)
- `GET /lessons/:id` - Single lesson
- `GET /news` - News list (with pagination)
- `GET /news/:id` - Single news article
- `GET /qa` - Q&A page
- `POST /qa` - Submit question

### Admin Routes
- `GET /admin/login` - Admin login page
- `POST /admin/login` - Admin login
- `GET /admin/logout` - Logout
- `GET /admin` - Admin dashboard
- `GET /admin/lessons` - Manage lessons
- `POST /admin/lessons` - Create lesson
- `GET /admin/news` - Manage news
- `POST /admin/news` - Create news article
- `GET /admin/questions` - Manage questions
- `GET /admin/questions/:id/gmail` - Generate Gmail link for answering

## Design System

The platform uses a modern gradient design system with:

- **Primary Colors**: Purple gradient (#667eea to #764ba2)
- **Secondary Colors**: Pink gradient (#f093fb to #f5576c)
- **Accent Colors**: Teal (#4ecdc4), Yellow (#ffd166)
- **Typography**: Poppins (headings), Inter (body)
- **Components**: Card-based design with rounded corners and soft shadows

## File Upload

The platform supports file uploads for lesson materials:
- **Allowed types**: PDF, Images (JPEG, PNG, GIF), Videos (MP4, WebM, OGG)
- **Max file size**: 50MB per file
- **Storage**: Local filesystem (`public/uploads/`)

## Gmail Integration

The Q&A system includes Gmail integration for answering questions:
- Clicking "Answer via Gmail" opens Gmail compose window
- Pre-filled with student email, subject, and question context
- Admin can directly reply to students via Gmail

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- Route protection middleware
- File type validation
- File size limits

## Development

### Running in Development Mode
```bash
npm run dev
```

This uses `nodemon` to automatically restart the server on file changes.

### Environment Variables
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `SESSION_SECRET` - Secret key for session encryption
- `NODE_ENV` - Environment (development/production)

## Production Deployment

1. Set `NODE_ENV=production` in your `.env` file
2. Use a strong `SESSION_SECRET`
3. Configure MongoDB connection string for production
4. Set up proper file storage (consider cloud storage for uploads)
5. Use a process manager like PM2
6. Configure reverse proxy (nginx) if needed

## License

ISC

## Support

For issues and questions, please open an issue on the repository.

