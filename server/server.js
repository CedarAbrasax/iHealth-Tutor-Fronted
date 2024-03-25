// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/chatgpt-api', async (req, res) => {
  const { userMessage } = req.body;

  try {
    // 模拟调用ChatGPT的API（你需要替换为实际的ChatGPT API）
    const chatGptResponse = await axios.post('http://127.0.0.1:4523/m1/3419333-0-a9a39bec/models/microsoft/DialoGPT-smallodels/microsoft/DialoGPT-small', {
      input: userMessage,
    });

    const botReply = chatGptResponse.data.output;

    res.json({ reply: botReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
