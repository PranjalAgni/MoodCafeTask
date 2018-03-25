const express = require('express');
const app = express();
const router = require('./routes/router'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const expressValidator = require('express-validator');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

//Connect to MongoDB
mongoose.connect('mongodb://localhost/MoodCafe');
var db = mongoose.connection;


//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

app.use(expressSession(
    {secret : 'pra' , 
    saveUninitalized: false , 
    resave: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//Parse incoming requests

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(expressValidator());


app.use(express.static(__dirname + '/template'));
app.use('/' , router);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  // define as the last app.use callback
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });


app.listen(8080 , function() {
    console.log('Listening to the port');
});


