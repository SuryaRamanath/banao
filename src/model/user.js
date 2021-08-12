const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    emailToken: {
      type: String
  },
  verifiedForReset: {
      type: Boolean,
      default: false
  },
  tokens: [{
    token: {
        type: String,
    }
}]
  },
  { collection: "user", timestamp: true }
);

const model = mongoose.model("userSchema", userSchema);

module.exports = model;
