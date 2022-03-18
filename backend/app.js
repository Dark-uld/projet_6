const express = require('express');
const mongoose = require('mongoose');
const helmet = require("helmet");
const rateLimit = require('express-rate-limit')



require('dotenv').config();


// iMPORTE ROUTES
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');


// CONNECTION SUR SERVEUR MONGOOSE
mongoose.connect('mongodb+srv://'+process.env.accName+':'+process.env.accPwd+'@cluster0.eobu0.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const limiter = rateLimit({
  windowMs: 5*60 * 1000, // 5 minutes
  max: 50, // limite de création de requete à 50 toutes les 5 minutes
  message:
    'Too request created from this IP, please try again after 5 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const accountLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // création et connection de compte limité à 5 toutes les minutes
  message:
    'Too many accounts created from this IP, please try again after an minute',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


// INSTALLATION EXPRESS
const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(express.json());

app.use((req, res, next) => {
 // SOLUTIONNER PROBLEME CROSS ORIGIN CORS
//d'accéder à notre API depuis n'importe quelle origine 
    res.setHeader('Access-Control-Allow-Origin', '*');
//d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
// d'envoyer des requêtes avec les méthodes mentionnées 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    // NEXT POUR PASSER AU PROCHAIN MIDDLEWARE
    next();
});

// ENREGISTRE ROUTER POUR TOUTE DEMANDE API 
app.use('/api/auth', accountLimiter, userRoutes);
app.use("/api/sauces", limiter,  sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;