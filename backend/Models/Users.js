var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true, // prevents duplicate accounts
    },

    age: {
      type: String,
      required: false, // optional because your signup form does not require it
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }
  },
  { timestamps: true } // automatically adds createdAt, updatedAt
);

const User = mongoose.model("User", userSchema);
module.exports = User;
  