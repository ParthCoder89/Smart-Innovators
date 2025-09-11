const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { email, mobile, password } = req.body;
  try {
    const user = new User({ email, mobile, password });
    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ error: "User already exists or invalid data" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });
    res.json({ token, user: { email, mobile } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;