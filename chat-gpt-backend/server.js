// // chat-gpt-backend/server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();
// const port = 3001;

// app.use(bodyParser.json());
// app.use(cors());

// app.post('/chatgpt-api', async (req, res) => {
//   const { userMessage } = req.body;
//   const apiKey = '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'; // 替换为你的 OpenAI API 密钥

//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/engines/davinci-codex/completions',
//       {
//         prompt: `User: ${userMessage}\n`,
//         max_tokens: 50, // 根据需要设置最大标记数
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const botReply = response.data.choices[0].text;
//     res.json({ reply: botReply });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
