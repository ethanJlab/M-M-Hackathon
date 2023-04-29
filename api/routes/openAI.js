import express from 'express';
export const openAIRouter = express.Router();
import  * as dotenv from 'dotenv';
dotenv.config();
import { Configuration, OpenAIApi } from 'openai';

var envVariables = process.env;
const {
    OPENAIKEY
} = envVariables;

const configuration = new Configuration({
    apiKey: OPENAIKEY,
});
const openai = new OpenAIApi(configuration);
const model = "gpt-3.5-turbo";

// the base enpoint, uses a general prompt 
openAIRouter.post('/', async function (req, res, next) {    
    
    var response = await openai.createChatCompletion({
        model : model,
        messages: [{role: "system", content : "You are a helpful chatbot."}]
    });
    console.log(process.env)
    res.send(response.data.choices[0].message);
    
});

// this endpoint uses a prompt that puts the chatbot in monkey banana mode
// must include the prompt in the request body and the input
openAIRouter.post('/inputPrompt', async function (req, res, next) {
    var prompt = req.body.prompt;
    var input = req.body.input;
    var response = await openai.createChatCompletion({
        model : model,
        messages:[{role: "system", content : prompt}, {role: "system", content : input}]
    });
    res.send(response.data.choices[0].message);
});

// this enpoint is used to translate the input text in a way a client can understand
openAIRouter.post('/clientHelp', async function (req, res, next) {
    var input = req.body.input;
    var response = await openai.createChatCompletion({
        model : model,
        messages: [{role: "system", content : "You are a helpful chatbot. You take legal input documents and summerize it in a way that a client can understand. Be sure to be brief in your reply"}, {role: "system", content : input}]
    });
    res.send(response.data.choices[0].message);
});

// this endpoint is used to translate the input text in a way a lawyer can understand
openAIRouter.post('/lawyerHelp', async function (req, res, next) {
    var input = req.body.input;
    var response = await openai.createChatCompletion({
        model : model,
        messages: [{role: "system", content : "You are a helpful chatbot. You take legal input documents and summerize it in a way that a lawyer can understand"}, {role: "system", content : input}]
    });
    res.send(response.data.choices[0].message);
});

// puts the chatbot in monkey banana mode
openAIRouter.post('/monkeyMode', async function (req, res, next) {
    var response = await openai.createChatCompletion({
        model : model,
        messages: [{role: "system", content : "You are a helpful chatbot. You only respond in monkey banana mode."}]
    });
    res.send(response.data.choices[0].message);
});

// rout that takes a 

export default openAIRouter;