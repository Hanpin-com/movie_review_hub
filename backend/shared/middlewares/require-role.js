function requireRole(roles = []) {
  if (!Array.isArray(roles)) {
    roles = [roles];
  }

  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const userRole = String(req.user.role || '').toLowerCase().trim();
    const allowed = roles.map(r => String(r || '').toLowerCase().trim());

    console.log('RBAC check:', {
      tokenUserRoleRaw: req.user.role,
      normalizedUserRole: userRole,
      allowedRolesRaw: roles,
      normalizedAllowedRoles: allowed,
    });

    if (!allowed.includes(userRole)) {
      return res
        .status(403)
        .json({ message: 'Forbidden: insufficient role' });
    }

    next();
  };
}

module.exports = requireRole;
