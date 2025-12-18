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
      required: false, 
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
    ,
    
    photo: {
      type: String,
      required: false,
    },
    // user preferences stored as a nested object
    preferences: {
      style: { type: [String], default: [] },
      budgetRange: { type: Number, default: null },
      travelFrequency: { type: String, default: "" },
      favoriteCity: { type: String, default: "" },
    },
    // trips planned by the user: reference to Activity
    trips: [
      {
        activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
        addedAt: { type: Date, default: Date.now },
        title: String,
        image: String,
        duration: String,
      },
    ],
  },
  { timestamps: true } 
);

const User = mongoose.model("User", userSchema);
module.exports = User;
  