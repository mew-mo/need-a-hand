const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  jobTitle: String,
  posterName: String,
  username: String,
  jobDescription: String,
  comments: {
    type: Array,
    require: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer'
  }

})

module.exports = mongoose.model('Post', postSchema);
