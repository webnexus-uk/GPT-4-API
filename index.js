const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

messages = [];

app.post("/message", (req, res) => {
  const message = req.body.message;

  messages.push({
    role: "user",
    content: message,
  });

  const response = openai.createChatCompletion({
    model: "gpt-4",
    messages,
  });

  response
    .then((result) => {
      messages.push({
        role: "assistant",
        content: result.data.choices[0].message.content,
      });
      res.send(result.data.choices[0].message.content);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
