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

const schemaConfig = {
    'class': 'Document',
    'vectorizer': 'text2vec-openai',
    'vectorIndexType': 'hnsw',
    'moduleConfig': {
        "text2vec-openai": {
            "model": "ada",
            "modelVersion": "002",
            "type": "text"
          }
    },
    'properties': [
        {
            "dataType": [
              "text"
            ],
            "description": "Content that will be vectorized",
            "moduleConfig": {
              "text2vec-openai": {
                "skip": false,
                "vectorizePropertyName": false
              }
            },
            "name": "content"
        }
    ]
}

await client.schema
    .classCreator()
    .withClass(schemaConfig)
    .do();


const schema = await client.schema.getter().do();

console.log(schema)