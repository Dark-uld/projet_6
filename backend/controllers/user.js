const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/User');

// ENREGISTREMENT DE NOVUEAU UTILISATEUR

exports.signup = (req, res, next) => {
    // bcrypt va hasher 10 fois le mdp : crypter
    bcrypt.hash(req.body.password, 10)
    // on recupe hash et on crée un nouvel utilisateur avec model mongoose avec mail et mdp hash
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        // save l'utilisateur dans la base de donnée
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


// CONNECTEZ DES UTILISATEUR EXISTANT
exports.login = (req, res, next) => {
    // chercher un utilisateur dont l'addresse mail correspond dans la requete
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }

      // comparé mdp dans req body avec user dans base de donnée
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          // on renvoie un objet json qui contient un user id et un token pour la connection
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};