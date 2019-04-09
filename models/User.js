const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  joiningDate: {
    type: Date
  },
  isManager:{
    type: Boolean,
    default: false
  },
  dob:{
    type: Date
  },
  address:{
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);
