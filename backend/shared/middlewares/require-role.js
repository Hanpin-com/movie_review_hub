function requireRole(roles = []) {
  if (!Array.isArray(roles)) {
    roles = [roles];
  }

  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }

    next();
  };
}

module.exports = requireRole;
