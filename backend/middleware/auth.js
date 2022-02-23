const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RF$y~Qc{u;9X<._>^qU=KbG@~Th&M@R2,A*(^#Eb!/uSY&6js<a6]UE`h3Mw@qH]quJ%Ju54pD"\\_@Pb[=.GStu-$c7U),qB4&#\+b!bBRQH!4&Xjk:W&K(US8MJ8U/');
    // verify transforme en donnée js basique
    const userId = decodedToken.userId;
    // userId raccourci JS de userId: userId
    req.auth = { userId};
    // VERIFICATION USER ID BODY correspond à user id
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
