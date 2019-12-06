import * as express from 'express';
var app = express();
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

// app.use(express.static(path.join(__dirname, '/client/static')));
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))

mongoose.connect('mongodb://localhost/memoryGame', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000, function () {
    console.log("listening on port 9000");
})