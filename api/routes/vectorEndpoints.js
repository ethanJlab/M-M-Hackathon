import express from 'express';
export const vectorRouter = express.Router();
import  * as dotenv from 'dotenv';
dotenv.config();
import { Configuration, OpenAIApi } from 'openai';
import weaviate from 'weaviate-ts-client';

var envVariables = process.env;
const {
    OPENAIKEY
} = envVariables;

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',  // Replace with your endpoint
    headers: {'X-OpenAI-Api-Key': OPENAIKEY},  // Replace with your inference API key
});

var baseUrl = "http://localhost:8080";

// takes input from the user and creates a vector
/* EX
{
    "class":"Document",
    "properties":{
        "content": "hello"
    }
}
*/
vectorRouter.post('/create', async function (req, res, next) {
    var createEndpoint = baseUrl + "/v1/objects/";
    let data = req.body;
    console.log(data);

    fetch(createEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Openai-Api-Key': OPENAIKEY
        },
        body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        res.send(data);
    })

    
});

// get all documents
vectorRouter.get('/getAll', async function (req, res, next) {
    var getAllEndpoint = baseUrl + "/v1/objects?class=Document&";
    fetch(getAllEndpoint, {
        method: 'GET',
        headers: {
            'X-OpenAi-Api-Key': OPENAIKEY
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        res.send(data);
    })
});


export default vectorRouter;
    