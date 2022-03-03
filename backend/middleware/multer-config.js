const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
// On enregistre l'image sur le storage
const storage = multer.diskStorage({
    // destination de l'image
  destination: (req, file, callback) => {
      // null = pas de soucis, images le dossier
    callback(null, 'images');
  },
  // nom de fichier
  filename: (req, file, callback) => {
    // créer le nom à  partir du nom d'origin en replacement les espaces par des "_"
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    name.replace(`.${extension}`, '');
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');