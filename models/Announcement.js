const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AnnouncementSchema = new Schema({
  announcementID: {
    type: Date,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  owner_name: {
    type: String,
    required: true
  },
  message:{
    type: String,
    required: true
  },
  viewers:{
    type: Array
  }
  
});

module.exports = Announcement = mongoose.model("Announcements", AnnouncementSchema);
