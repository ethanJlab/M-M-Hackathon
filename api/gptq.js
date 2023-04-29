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


const generateTask = 'What do the documents concerning an Andrew East Contain and what are some titles of these documents';

var keywords = "" + generateTask;

client.graphql
  .get()
  .withClassName('Document')
  .withFields('content')
  .withNearText({
    concepts: [keywords]
  })
  .withGenerate({
    groupedTask: generateTask,
  })
  .withLimit(3)
  .do()
  .then(res => {
    // console.log(JSON.stringify(res))
    console.log(res.data.Get.Document[0]._additional.generate.groupedResult)
    // console.log(res.data.Get.Document[0])
  })
  .catch(err => {
    console.error(err)
  });


        
