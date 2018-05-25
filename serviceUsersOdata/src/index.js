var odata = require('odata-simple-server');

server = odata('mongodb://joraca:123456@ds215370.mlab.com:15370/user_75');

server.resource('users', {
    name: String,
    password: {
        type: String,
        select: false
    }
});

server.listen(3000, function() {
    console.log('OData services has started, you can visit by http://localhost:3000/users');
});