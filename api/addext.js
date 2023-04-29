import fs from "fs";
import weaviate from 'weaviate-ts-client';
import  * as dotenv from 'dotenv';
dotenv.config();

var envVariables = process.env;
const {
    OPENAIKEY
} = envVariables;

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',  // Replace with your endpoint
    headers: {'X-OpenAI-Api-Key': OPENAIKEY},  // Replace with your inference API key
});



await fs.readFile('./Multi FL Medical Records Request w Hipaa form text.txt', (err, data) => {
    if (err) throw err;
 
     

        

        client.data.creator()
        .withClassName("Document")
        .withProperties({
            content: data.toString(),
        })
        .do();
})