const Sauce = require('../models/sauce');
const fs = require('fs');

// créer une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// recupérer toutes les sauces
exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


// Selectionné une sauce spécifique
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then( 
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// Modification de la sauce
exports.modifySauce = (req, res, next) => {
  // test si il y a une nouvelle image
  const sauceObject = req.file ?
    {
      // si fichier existe, on recup la nouvelle image
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      
    } : { ...req.body }; // sinon on reprend body
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // modification de la sauce
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {
      // Si pas une sauce existance
      if (!sauce) {
        res.status(404).json({
          error: new Error('No such Sauce!')
        });
      } else if (sauce.userId !== req.auth.userId) { // si id créateur sauce n'est pas id utilisateur
        res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      } else {
        Sauce.deleteOne({ _id: req.params.id }).then( // supression de la sauce 
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
      
    }
  )
  .catch(error => res.status(400).json({ error }));
};

