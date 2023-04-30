import fs from "fs";
import weaviate from "weaviate-ts-client";
import * as dotenv from "dotenv";
dotenv.config();

export async function generateRequest(userPrompt,keywords) {
  var envVariables = process.env;
  const { OPENAIKEY } = envVariables;

  const client = weaviate.client({
    scheme: "http",
    host: "localhost:8080", // Replace with your endpoint
    headers: { "X-OpenAI-Api-Key": OPENAIKEY }, // Replace with your inference API key
  });

  
  


  const ret = await client.graphql
    .get()
    .withClassName("Document")
    .withFields("content")
    .withNearText({
      concepts: [keywords]
    })
    .withGenerate({
      groupedTask: userPrompt,
    })
    .withLimit(3)
    .do()
    .then((res) => {
      // console.log(JSON.stringify(res))
      const answer = res.data.Get.Document[0]._additional.generate.groupedResult
      
      // console.log(res.data.Get.Document[0]);

      return answer;
    })
    .catch((err) => {
      console.error(err);
    });

    
    return ret;
}
