// importation du model sauce
const Sauce = require('../models/sauce');

const fs = require('fs');


// Modification de la sauce
exports.modifyLike = (req, res, next) => {
    // récupérer l'id dans l'url de la requete

    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        // Ajout d'un like 
        if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1){
            Sauce
            .updateOne(
                { _id: req.params.id }, 
                {
                    $inc: {likes: 1}, 
                    $push : {usersLiked: req.body.userId}
                }
            )
            .then(() => res.status(200).json({ message: 'Like modifié !'}))
            .catch(error => res.status(400).json({ error })); 
        } 
        // Retirer un like
        if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0){
            Sauce
            .updateOne(
                { _id: req.params.id }, 
                {
                    $inc: {likes: -1}, 
                    $pull : {usersLiked: req.body.userId}
                }
            )
            .then(() => res.status(200).json({ message: 'Like modifié !'}))
            .catch(error => res.status(400).json({ error })); 
        } 
        // Ajout d'un dislike 
        if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1){
            Sauce
            .updateOne(
                { _id: req.params.id }, 
                {
                    $inc: {dislikes: 1}, 
                    $push : {usersDisliked: req.body.userId}
                }
            )
            .then(() => res.status(200).json({ message: 'Like modifié !'}))
            .catch(error => res.status(400).json({ error })); 
        } 
        // Retirer un dislike
        if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0){
            Sauce
            .updateOne(
                { _id: req.params.id }, 
                {
                    $inc: {dislikes: -1}, 
                    $pull : {usersDisliked: req.body.userId}
                }
            )
            .then(() => res.status(200).json({ message: 'Like modifié !'}))
            .catch(error => res.status(400).json({ error })); 
        } 
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  
  };