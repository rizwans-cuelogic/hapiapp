const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Schema 
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    max: 12
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = User = mongoose.model('users', UserSchema);