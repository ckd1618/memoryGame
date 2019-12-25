var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

// app.use(express.static(path.join(__dirname, '/client/static')));
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(bodyParser.json());

app.use(session({
    secret: 'amptLive314159',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))

mongoose.connect('mongodb://localhost/apmt', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000, function () {
    console.log("listening on port 8000");
})