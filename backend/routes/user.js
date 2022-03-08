const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
// verification que le mail a un format valide
const emailValidating = require('../middleware/email');
// verification que le password a un format valide
const passwordValidating = require('../middleware/password');

// Route création de compte
router.post('/signup',emailValidating, passwordValidating, userCtrl.signup);
// Route login 
router.post('/login', userCtrl.login);


module.exports = router;