const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, pattern: /^[a-zA-Z0-9.!#$%&*+/=?^_~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/},
  password: {  type: String, required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);