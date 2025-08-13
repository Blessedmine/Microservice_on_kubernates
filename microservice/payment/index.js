const express = require('express');
const app = express();
app.use(express.json());

app.post('/process', (req, res) => {
  const { amount, cardToken } = req.body;
  // In a real app, integrate with Stripe/PayPal
  if (amount && cardToken) {
    return res.json({
      success: true,
      transactionId: 'txn_' + Math.random().toString(36).substr(2, 9)
    });
  }
  res.status(400).json({ success: false, error: 'Invalid payment data' });
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Payments service running on port ${PORT}`));