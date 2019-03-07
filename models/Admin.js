const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
  adminid: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  }
});

module.exports = Admin = mongoose.model("admins", AdminSchema);