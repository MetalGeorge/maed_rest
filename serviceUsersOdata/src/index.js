var odata = require('node-odata');
var jwt = require('jsonwebtoken');
var config = require('./config/config');


server = odata('mongodb://joraca:123456@ds215370.mlab.com:15370/user_75');

server.resource('users', {
    name: String,
    email: String,
    password: {
        type: String,
        select: false
    },
    dateCreate: String,
    state: { type: String, enum: ['active', 'inactive'] },
    isSeller: { type: String, enum: ['yes', 'no'] },
    isBuyer: { type: String, enum: ['yes', 'no'] },
    isAdmin: { type: String, enum: ['yes', 'no'] }
}).list().auth(function(req) {
    var token = req.headers['authorization']
    if (!token) {
        console.log('No hay token');
        return false;
    } else {
        token = token.substring(7);
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) valor = false
            else {
                req.userId = decoded.id;
                req.isSeller = decoded.isSeller;
                req.isBuyer = decoded.isBuyer;
                req.isAdmin = decoded.isAdmin;
                console.log('logro autenticar');
                if (decoded.isAdmin == 'yes')
                    valor = true;
                else
                    valor = false;
            }
        });
        return valor
    }
});


server.listen(3001, function() {
    console.log('OData services has started, you can visit by http://localhost:3001/users');
});