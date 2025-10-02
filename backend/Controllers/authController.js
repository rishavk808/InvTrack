const User = require('../Models/User');
const jwt = require('jsonwebtoken');

// Admin registers staff
exports.registerStaff = async (req, res) => {
  try {
    // Only admin can create staff
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Only admin can create staff accounts' });
    }

    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already in use' });

    const staff = await User.create({ name, email, password, role: 'staff' });

    res.json({ msg: 'Staff account created', staff: { id: staff._id, name, email } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login (Admin & Staff)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

    const token = jwt.sign(
      { user: { id: user._id, role: user.role } },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// Logout (frontend will also clear token)
exports.logout = async (req, res) => {
  try {
    // If using cookies
    res.clearCookie("token");
    // If using localStorage, frontend just removes it
    res.json({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
