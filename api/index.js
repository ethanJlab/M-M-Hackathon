var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var port = 9000;

var openAIRouter = require('./routes/openAI');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use('/openAI', openAIRouter);

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })

module.exports = router;