import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and Content Handlers
app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(express.json());

// API Endpoint Route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Incomplete dataset payload. Missing variables.' });
  }

  console.log('--- New Inbound Portfolio Contact Transmission ---');
  console.log(`Identity: ${name}`);
  console.log(`Routing Address: ${email}`);
  console.log(`Payload Body: ${message}`);

  return res.status(200).json({ success: true, status: 'Payload securely logged.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal pipeline fault encountered.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Premium Portfolio Services operational running on system layer port ${PORT}`);
});