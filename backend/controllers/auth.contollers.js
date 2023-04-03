const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(409).json({ message: "Email already exists" });

  const user = new User({ name, email, password });

  if (role) user.role = role;

  await user.save();

  const { password: hashedPassword, ...newUser } = user.toJSON();

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY);
   res.json({ token });
  res.status(201).json(newUser);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "Invalid Credentials" });

  const isMatched = await user.matchPassword(password);

  if (!isMatched) return res.status(404).json({ message: "Invalid Credentials" });

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY);

  res.json({ token });
};
