const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  _id :mongoose.Schema.Types.ObjectId,
  name: String,
  username: String,
  email: String,
  password: String,
  pfpUrl: String,
  studyField: String,
  educator: String,
  extra: String

});

module.exports = mongoose.model('Student', studentSchema);
