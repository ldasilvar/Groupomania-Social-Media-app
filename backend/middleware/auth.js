const jwt = require("jsonwebtoken");
const JWT_TOKEN = '<EXTREMELY SUPER ULTRA RANDOM_TOKEN_SECRET>'

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, JWT_TOKEN)
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            throw "User not recognized !"
        } else {
            next()
        }
    } 
    catch (error) {
        res.status(401).json({ error: error || "Request not authorized !" })
    }
}
 

