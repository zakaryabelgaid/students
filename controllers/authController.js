const User = require('../models/User');

// Render login page
exports.getLogin = (req, res) => {
  res.render('admin/login', { error: null });
};

// Handle login
exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('admin/login', { error: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('admin/login', { error: 'Invalid email or password' });
    }

    // Check if admin
    if (user.role !== 'admin') {
      return res.render('admin/login', { error: 'Access denied. Admin privileges required.' });
    }

    // Create session
    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.userName = user.name;

    res.redirect('/admin');
  } catch (error) {
    console.error('Login error:', error);
    res.render('admin/login', { error: 'An error occurred. Please try again.' });
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
};

