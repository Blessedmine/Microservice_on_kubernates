const express = require('express');
const app = express();
app.use(express.json());

app.get('/stats', (req, res) => {
  res.json({
    activeUsers: 42,
    revenue: 12500,
    services: ['auth', 'user', 'payments']
  });
});

const PORT = 3006;
app.listen(PORT, () => console.log(`Admin service running on port ${PORT}`));