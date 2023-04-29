var express = require('express');
var router = express.Router();
var env = require('dotenv');
import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: process.env.openAI-key
});
const openai = new OpenAIApi(configuration);

router.post('/', async function (req, res, next) {
    
    var response = await openai.Completions.create({

});
module.exports = router;