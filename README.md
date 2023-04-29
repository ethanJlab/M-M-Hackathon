# M-M-Hackathon

# Running the api app
Navigate to the api directory <br>
run ```npm i ``` and then ``` npm start ```

# OpenAI API endpoints

### inputPrompt (post)
- "inputPrompt" enpoint is used for general GPT inputs
- hosted at localhost:9000/openAI/inputPrompt
- input: { prompt : "The general instruction for the bot to follow", input:"The input file or text for the bot to respond to"}
- output: { role: "role of bot", content : "main response from the api"}
----------------------------
### Client Help (post)
- "clientHelp" endpoint takes a file and intrepets it for the client
- hosted at localhost:9000/openAI/clientHelp
- input : {input:"input file"}
- output: { role: "role of bot", content : "main response from the api"}
----------------------------------------------------------
### lawyer Help (post)
- "lawyerHelp" endpoint takes a file and intrepets it for a lawyer
- hosted at localhost:9000/openAI/lawyerHelp
- input : {input:"input file"}
- output: { role: "role of bot", content : "main response from the api"}
----------------------------------------------------------
### Monkey Mode (post)
- "monkeyMode"
- hosted at localhost:9000/openAI/monkeyMode
------------------------------------------------

# Vector DB endpoints

## add doc (post)
- used to add documents to the database
- hosted at localhost:8080/vector/create
- input{
    "class":"Document",
    "properties":{
        "content": "hello"
    }
}
- output {"class": "Document",
    "creationTimeUnix": 1682792671119,
    "id": "0d5425f2-139f-4fdf-829b-3516a0a784db",
    "lastUpdateTimeUnix": 1682792671119,
    "properties": {
        "content": "hello"
    },
    "vector": [
        -0.01775357,
        0.00250483
        ]
        }
-----------------------------
## get all (get)
- gets all documents in the DB
- hosted at localhost:8080/vector/getAll
- no input
- outputs an array of docs
