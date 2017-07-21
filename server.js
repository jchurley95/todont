//===========================
// REQUIREMENTS
//===========================
var express = require("express");
var logger = require("morgan");
const bodyParser = require("body-parser");
var hbs = require('hbs');
const methodOverride = require('method-override');

var app = express();
var port = process.env.PORT || 3000;

//===========================
// MIDDLEWARE
//===========================
//this is for morgan
app.use(logger("dev"));
//these are for bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//set handlebars as view engine
app.set("view engine", "hbs");
app.set('views', './views');
//set dirname
app.use(express.static(__dirname + '/public')); // VERY IMPORTANT!! Make sure to add a '/'

//===========================
// CONTROLLERS
//===========================

//controllers for `/todonts_controller` resource
var todontsController = require('./controllers/todonts_controller.js');
app.use("/todonts", todontsController);

app.get('/', (req, res) => {
	res.send('This is our homepage');
});

//===========================
// LISTENERS
//===========================
app.listen(port, function(req, res){
	console.log('Server Up -- Ready to serve hot todonts on port', port, "//", new Date());
});
