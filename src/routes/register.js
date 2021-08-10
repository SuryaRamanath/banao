const express = require("express");
const User = require("../../model/user");
const bcrypt = require("bcrypt");
const router = new express.Router();

router.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const npassword = await bcrypt.hash(password, 10);
  try {
    const resp = await User.create({
      username,
      email,
      password: npassword,
    });
    return res.json({
      status: "ok",
      msg: "User added successfully",
      user: resp,
    });
  } catch (error) {
    return res.json({ status: "error", msg: e });
  }
});

module.exports = router;
