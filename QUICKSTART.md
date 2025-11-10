# Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/teacher-platform
SESSION_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running:
```bash
# Windows (if installed as service, it should auto-start)
# Or use MongoDB Compass

# Linux/Mac
mongod
```

### 4. Create Admin User
```bash
# Default admin (admin@example.com / admin123)
npm run create-admin

# Custom admin
npm run create-admin "Your Name" "your@email.com" "yourpassword"
```

### 5. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### 6. Access the Application
- Open your browser: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`

## First Steps After Setup

1. **Login as Admin**
   - Go to `/admin/login`
   - Use the credentials you created

2. **Create Your First Lesson**
   - Navigate to Admin Dashboard
   - Click "Manage Lessons"
   - Fill in the form and upload materials

3. **Create News Article**
   - Go to "Manage News"
   - Create your first article

4. **Test Q&A System**
   - Go to `/qa` as a student
   - Submit a test question
   - Go back to admin panel to answer it via Gmail

## Default Admin Credentials
If you used the default create-admin command:
- **Email**: admin@example.com
- **Password**: admin123

⚠️ **Important**: Change the password immediately after first login!

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- Verify MongoDB is accessible on the specified port

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using port 3000

### File Upload Issues
- Ensure `public/uploads/` directory exists
- Check file permissions
- Verify file size is under 50MB

### Session Issues
- Make sure `SESSION_SECRET` is set in `.env`
- Clear browser cookies if login doesn't work

## Project Structure Overview

```
platform/
├── models/          # Database schemas
├── controllers/     # Business logic
├── views/           # EJS templates
├── routes/          # URL routing
├── middleware/      # Custom middleware
├── public/          # Static files (CSS, JS, uploads)
└── scripts/         # Utility scripts
```

## Next Steps

- Customize the design in `public/css/style.css`
- Add more features as needed
- Configure production settings
- Set up cloud storage for file uploads (optional)

For detailed documentation, see `README.md`

