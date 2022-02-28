const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const emailValidating = require('../middleware/email');
const passwordValidating = require('../middleware/password');

router.post('/signup',emailValidating, passwordValidating, userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;