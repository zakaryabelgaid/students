// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/admin/login');
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.session && req.session.userId && req.session.role === 'admin') {
    return next();
  }
  res.status(403).render('error', { error: 'Access denied. Admin privileges required.' });
};

// Middleware to check if user is logged in (for redirecting logged-in users)
const redirectIfLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.redirect('/admin');
  }
  next();
};

module.exports = {
  requireAuth,
  requireAdmin,
  redirectIfLoggedIn
};

