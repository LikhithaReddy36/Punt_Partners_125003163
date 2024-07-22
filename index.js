console.log('Starting server...');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
console.log('API Key:', process.env.AIzaSyCYuUccb1w696wTmxKPyPk6VdBXlX2UcQw);

app.use(cors());
app.use(bodyParser.json());

app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;

  try {
    const response = await axios.post(`https://api.translation.service/translate`, {
      text,
      targetLanguage,
      key: process.env.TRANSLATION_API_KEY,
    });
    res.json({ translatedText: response.data.translatedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
