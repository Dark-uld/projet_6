const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();


// iMPORTE ROUTES
const userRoutes = require('./routes/user');


// CONNECTION SUR SERVEUR MONGOOSE
mongoose.connect(process.env.serverDataBaseLink,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// INSTALLATION EXPRESS
const app = express();


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


module.exports = app;