var passwordValidator = require('password-validator');
const fs = require('fs');

let listPassword = [];

fs.readFile('./middleware/passwordList.txt', function(err, data) {
    if(err) throw err;

    const arr = data.toString().replace(/\r\n/g,'\n').split('\n');

    for(let i of arr) {
        listPassword.push(i);
    }
});


// Create a schema
var passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(listPassword); // Blacklist these values


module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)){
        next();
    } else{
        return res
            .status(400)
            .json({error : "Le mot de passe nest pas assez fort" + passwordSchema.validate('req.body.password', { list: true })})
    }
}