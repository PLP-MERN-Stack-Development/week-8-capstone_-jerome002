const User = require("./models/User");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    next(err);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    next(err);
  }
};
