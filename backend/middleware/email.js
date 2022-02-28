const emailRegEx = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

module.exports = (req, res, next) => {
    const emailAValide = req.body.email;
    if (emailAValide.match(emailRegEx)){
        next();
    } else{
        return res
            .status(400)
            .json({error : "L'email est incorrect"})
    }
}