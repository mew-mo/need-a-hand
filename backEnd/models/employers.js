const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  _id :mongoose.Schema.Types.ObjectId,
  name: String,
  username: String,
  email: String,
  password: String,
  pfpUrl: String,
  workField: String,
  companyName: String,
  extra: String

});

module.exports = mongoose.model('Employer', employerSchema);
