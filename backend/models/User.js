const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var validateEmail = function(email) {
  var re = /^[^!@#$%^&*)(':;]+@[a-zA-Z]+\.[a-zA-Z]+$/;
  return re.test(email)
};
var validatePassword = function(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return re.test(password)
};

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
  password: {  type: String, required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);