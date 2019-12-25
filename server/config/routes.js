var users = require('../controllers/users.js');
var path = require('path');
module.exports = function(app) {
    app.post('/api/users', users.register);
    app.post('/api/login', users.login);
    app.get('/api/current_user', users.get_current);
    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}