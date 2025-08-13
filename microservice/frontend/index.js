const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', async (req, res) => {
  try {
    const users = await axios.get('http://user-service:3001/users');
    res.json({
      message: 'API Gateway',
      users: users.data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3007;
app.listen(PORT, () => console.log(`Frontend service running on port ${PORT}`));