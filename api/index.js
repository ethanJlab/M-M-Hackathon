import createError from 'http-errors';
import express from 'express';
import path from 'path';
import weaviate from 'weaviate-ts-client';
import cors from "cors"


const app = express();
app.use(cors());
const router = express.Router();


var port = 9000;

// routes
import openAIRouter from './routes/openAI.js';
import vectorRouter from './routes/vectorEndpoints.js';

app.set('views', path.join(import.meta.url, '..', 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use('/openAI', openAIRouter);
app.use('/vector', vectorRouter);

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/*
const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',  // Replace with your endpoint
});

const schema = await client.schema.getter().do();

console.log(schema)
*/
export default router;