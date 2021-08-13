const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const emailVerification = require("../utils/verifyEmail");


router.post("/api/forgot-password", async (req, res) => {
  await emailVerification(req, res);
});

router.get("/api/forgot-password/:token", async (req, res) => {
  const { token } = req.params
  try {
      let user = await User.findOne({ emailToken: token });
      if (!user) {
          return res.json({
              status: "error",
              msg: "Token is invalid or expired",
          });
      }
      await User.findOneAndUpdate(
          { emailToken: token },
          { $set: { verifiedForReset: true } }
      );
      return res.json({
          status: "ok",
          msg: "verified",
          emailToken: token
      });
  } catch (error) {
      console.log(error);
      res.json({
          status: "error",
          msg: "Token is invalid or expired",
      });
  }
});

router.post("/api/reset-password", async (req, res) => {
  const { new_password, confirm_password, token } = req.body;
  console.log("recieved a post request for reset password");
  try {
      const user = await User.findOne({ emailToken: token });
      if (!user) {
          return res.json({
              status: "error",
              msg: "Invalid token or token is expired",
          });
      }
      if(!user.verifiedForPasswordReset){
          return res.json({
              status: "error",
              msg: "You have no permissions"
          })
      }
      if (token !== user.emailToken || user.emailToken === null) {
          return res.json({
              status: "error",
              msg: "token is not valid or expired",
          });
      }
      
      if (new_password !== confirm_password) {
          res.json({ status: "error", msg: "password does not match" });
      }
      const password = await bcrypt.hash(new_password, 10);
      await User.findOneAndUpdate(
          { emailToken: token },
          { $set: { password: password, emailToken: null } }
      );
      return res.json({
          status: "ok",
          msg: "password changed successfullly",
      });
     
  } catch (e) {
      console.log(e);
      return res.json({ status: "error", msg: "something went wrong" });
  }
});

module.exports = router