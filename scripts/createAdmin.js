const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/teacher-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB Connected');
  
  // Get admin details from command line arguments or use defaults
  const args = process.argv.slice(2);
  const name = args[0] || 'Admin';
  const email = args[1] || 'admin@example.com';
  const password = args[2] || 'admin123';
  
  // Check if admin already exists
  const existingAdmin = await User.findOne({ email, role: 'admin' });
  if (existingAdmin) {
    console.log('Admin user already exists with this email!');
    process.exit(1);
  }
  
  // Create admin user
  const admin = new User({
    name,
    email,
    password, // Will be hashed automatically by the pre-save hook
    role: 'admin'
  });
  
  await admin.save();
  console.log('✅ Admin user created successfully!');
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${password}`);
  console.log('\n⚠️  Please change the password after first login!');
  
  process.exit(0);
})
.catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

