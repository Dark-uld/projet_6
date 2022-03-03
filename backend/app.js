const express = require('express');
const mongoose = require('mongoose');
const helmet = require("helmet");

require('dotenv').config();


// iMPORTE ROUTES
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');


// CONNECTION SUR SERVEUR MONGOOSE
mongoose.connect(process.env.serverDataBaseLink,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


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
app.use('/api/auth', userRoutes);
app.use("/api/sauces", sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;