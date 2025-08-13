const express = require('express');
const app = express();
app.use(express.json());

let metrics = {
  pageViews: 0,
  apiCalls: 0
};

app.post('/track', (req, res) => {
  const { event } = req.body;
  if (event === 'pageView') metrics.pageViews++;
  if (event === 'apiCall') metrics.apiCalls++;
  res.json(metrics);
});

app.get('/metrics', (req, res) => {
  res.json(metrics);
});

const PORT = 3005;
app.listen(PORT, () => console.log(`Analytics service running on port ${PORT}`));