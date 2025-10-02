const User = require('../Models/User');
// Get all users (admin only)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // don't send passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
//  Get single user by ID (admin or the same user)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // only admin or same user can view
    if (req.user.role !== 'admin' && req.user.id !== user.id.toString()) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// Update user (admin only for role, others can update own profile)
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // if not admin, can only update self
    if (req.user.role !== 'admin' && req.user.id !== user.id.toString()) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    // only admin can change roles
    if (req.user.role === 'admin' && role) {
      user.role = role;
    }

    await user.save();
    res.json({ msg: 'User updated', user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Only admin can delete users' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
