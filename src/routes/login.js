const bcrypt = require("bcryptjs");
const User = require("../model/user");
const express = require("express");
const router = new express.Router();

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();
  if (!user) {
    return res.json({ status: "error", msg: "Invalid username/password" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.json({ status: "error", msg: "Invalid username/password" });
  }

  return res.json({
    status: "OK",
    msg: "Logged in successfully",
    user: userr,
  });
});

module.exports = router;
