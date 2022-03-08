// ROUTER 
const express = require('express');
// CREATION D UN ROUTER
const router = express.Router();

// middleware pour proteger la route
const auth = require('../middleware/auth');
//middleware pour l'image
const multer = require('../middleware/multer-config');


// appel du model mongoose dans ce fichier
const sauceCtrl = require ('../controllers/sauces');
const likeCtrl = require ('../controllers/like')

// Route Affichage de toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauce);
// Route Creation d'une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
// Route Affichage d'une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);
// Route Modification d'une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// Route Supression d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// Route  Modification des likes/dislikes d'une sauce
router.post('/:id/like', auth, likeCtrl.modifyLike);

module.exports = router;
