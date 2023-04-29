var createError = require('http-errors');
var express = require('express');
var path = require('path');

var openAIRouter = require('./routes/openAI');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openAI', openAIRouter);

module.exports.app;