const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/User');


const saltRounds = 10;
// ENREGISTREMENT DE NOVUEAU UTILISATEUR

exports.signup = (req, res, next) => {
  bcrypt.genSalt(saltRounds).then(salt => {
    bcrypt.hash(req.body.password, salt)
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
  })
  .catch(error => res.status(500).json({ error }))
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
                'RF$y~Qc{u;9X<._>^qU=KbG@~Th&M@R2,A*(^#Eb!/uSY&6js<a6]UE`h3Mw@qH]quJ%Ju54pD"\\_@Pb[=.GStu-$c7U),qB4&#\+b!bBRQH!4&Xjk:W&K(US8MJ8U/',
                { expiresIn: '24h' }
              )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};