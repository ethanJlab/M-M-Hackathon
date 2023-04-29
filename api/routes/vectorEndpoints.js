import express from 'express';
export const vectorRouter = express.Router();
import  * as dotenv from 'dotenv';
dotenv.config();
import { Configuration, OpenAIApi } from 'openai';
import weaviate from 'weaviate-ts-client';
import { generateRequest } from '../gptq.js';

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
    var createEndpoint = baseUrl + "/v1/objects";
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

// endpoint to get query a vector
vectorRouter.post('/query', async function (req, res, next) {
    var query = JSON.stringify(req.body.content);
    var keywords;
    //console.log("Here Babe")
    // hit the openai endpoint to ask to generate keywords based on the query
    await fetch('http://localhost:9000/openAI/inputPrompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body :JSON.stringify({input: query, prompt:"Based on this query, generate keywords in one line."}) 
        })
        .then(response => response.json())
        .then(data => {
            
            keywords = JSON.stringify(data.content);
           
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        
       
       const parsedResponse = JSON.parse(query);
        const parsedKeywords = JSON.parse(keywords);
        
       
    //    const personality = "Saul goodman";

       
       const userAnswer = await generateRequest(parsedResponse,keywords)

       if(userAnswer == null){
            res.send("No relevant answer found, please add more relevant data.");
        }else{
            res.send(userAnswer);
        }

       

        // client.graphql
        // .get()
        // .withClassName('Document')
        // .withFields('content')
        // .withNearText({
        //     concepts: [keywords]
        // })
        // .withGenerate({
        //     groupedTask: query,
        // })
        // .withLimit(3)
        // .do()
        // .then(res => {
        //     // console.log(JSON.stringify(res))
        //     console.log(res.data.Get.Document[0]._additional.generate.groupedResult)
        //     res.send(res.data.Get.Document[0]._additional.generate.groupedResult);
        // })
        // .catch(err => {
        //     console.error(err)
        // });

});


export default vectorRouter;
    