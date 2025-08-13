const express = require('express');
const app = express();
app.use(express.json());

let bills = [
  { id: 1, userId: 1, amount: 100, paid: false },
  { id: 2, userId: 2, amount: 200, paid: true }
];

app.get('/bills', (req, res) => {
  res.json(bills);
});

app.post('/bills', (req, res) => {
  const bill = { id: bills.length + 1, ...req.body };
  bills.push(bill);
  res.status(201).json(bill);
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Billing service running on port ${PORT}`));