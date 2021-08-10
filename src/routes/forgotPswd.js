const User = require("../../model/user");
const express = require("express");
const router = new express.Router();

router.post("/api/forgot-password", async (req, res) => {
  const { username, email, newPass, confirmPass } = req.body;
  const user = await User.findOne({ username }).lean();
  if (!user) {
    return res.json({ status: "error", msg: "Invalid username !!" });
  }
  if (user.email != email) {
    return res.json({ status: "error", msg: "Not the registered email !!" });
  }
  if (newPass != confirmPass) {
    return res.json({ status: "error", msg: "passwords doesnot match !!" });
  }
  try {
    const npassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ username }, { password: npassword });
    return res.json({ status: "ok", msg: "password updated successfully.." });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }
});

module.exports = router;
