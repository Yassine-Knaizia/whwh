const mongoose = require("mongoose");
const db = require('./connect.js');
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    imageUrl: String,
    key: String,
    myToDoList: [],
    companyToDoList: [],
    type: { type: String, default: "user" }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;

