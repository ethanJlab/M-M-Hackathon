# M-M-Hackathon

# OpenAI API endpoints

- "inputPrompt" enpoint is used for general GPT inputs
- hosted at localhost:9000/openAI/inputPrompt
- input: { prompt : "The general instruction for the bot to follow", input:"The input file or text for the bot to respond to"}
- output: { role: "role of bot", content : "main response from the api"}
----------------------------
- "clientHelp" endpoint takes a file and intrepets it for the client
- hosted at localhost:9000/openAI/clientHelp
- input : {input:"input file"}
- output: { role: "role of bot", content : "main response from the api"}
----------------------------------------------------------
- "lawyerHelp" endpoint takes a file and intrepets it for a lawyer
- hosted at localhost:9000/openAI/lawyerHelp
- input : {input:"input file"}
- output: { role: "role of bot", content : "main response from the api"}
----------------------------------------------------------
- "monkeyMode"
- hosted at localhost:9000/openAI/monkeyMode


