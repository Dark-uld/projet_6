// Appel Mangoose : node.js based Object Data Modelim library for MongoDB

const mongoose = require('mongoose');

// Initialisation d'un schema Mongoose

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number},
  dislikes: { type: Number},
  usersLiked: { type: String},
  usersDisliked: { type: String},
});


// Exportation du model Mongoose
module.exports = mongoose.model('Sauce', sauceSchema);