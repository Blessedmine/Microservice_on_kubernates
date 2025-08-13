const express = require('express');
const app = express();
app.use(express.json());

app.post('/send', (req, res) => {
  const { to, subject, message } = req.body;
  console.log(`Sending email to ${to}: ${subject} - ${message}`);
  res.json({ success: true, message: 'Notification queued' });
});

const PORT = 3004;
app.listen(PORT, () => console.log(`Notifications service running on port ${PORT}`));