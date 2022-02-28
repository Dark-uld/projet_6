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


router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, likeCtrl.modifyLike);

module.exports = router;
