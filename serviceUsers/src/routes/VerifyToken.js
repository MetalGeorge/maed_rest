var jwt = require('jsonwebtoken');
var config = require('../config/config');

function verifyToken(req, res, next) {
    var token = req.headers['authorization']
    token = token.substring(7);
    console.log(req.baseUrl);
    console.log(req.route.methods);
    console.log(req.route.methods.delete);


    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        if (req.route.methods.get) {
            if (decoded.isAdmin != 'si')
                return res.status(403).send({ auth: false, message: 'forbidden to delete user' });
        }
        if (req.route.methods.put) {

        }
        if (req.route.methods.delete == true) {
            console(req)
            if ((decoded.isAdmin != 'si') || (decoded.userId == 4))
                return res.status(403).send({ auth: false, message: 'forbidden to delete user' });
        }
        req.userId = decoded.id;
        req.isSeller = decoded.isSeller;
        req.isBuyer = decoded.isBuyer;
        req.isAdmin = decoded.isAdmin;
        next();
    });
}
module.exports = verifyToken;