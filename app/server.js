var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

mongoose.connect("mongodb://mongodb/resources");

var Resource = app.resource = restful.model('resource', mongoose.Schema({
    data: String,
    time: {type : Date, default: Date.now},
  }))
  .methods(['get', 'post']);

Resource.register(app, '/resources');

app.listen(3000);
