import express from 'express';
export const weaviateRouter = express.Router();
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',  // Replace with your endpoint
});

const schema = await client.schema.getter().do();

console.log(schema)