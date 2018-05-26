var odata = require('node-odata');

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
});

server.listen(3001, function() {
    console.log('OData services has started, you can visit by http://localhost:3001/users');
});