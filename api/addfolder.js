import fs from "fs";
import weaviate from 'weaviate-ts-client';
import  * as dotenv from 'dotenv';
import path from 'path';
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

const folderPath = './txt_files'; // Replace with your folder path
fs.readdir(folderPath, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;

        client.data.creator()
        .withClassName("Document")
        .withProperties({
            content: data.toString(),
        })
        .do();
    })
  });
});
