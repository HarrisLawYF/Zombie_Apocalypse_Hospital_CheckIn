var express = require('express'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 3001;
    mongoose = require('mongoose'),
    patient = require('./api/models/Patient'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/hospitalDB',
mongoose.connect(mongoUrl, { useNewUrlParser: true , useUnifiedTopology: true});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/Routes'); //importing route
routes(app); //register the route

module.exports = app.listen(port);

console.log('Zombie Apocalypse RESTful API server started on: ' + port);
