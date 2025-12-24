require('dotenv').config();  // Load environment variables from .env file

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const PORT = process.env.PORT || 5000;
const IP_ADDRESS = process.env.IP_ADDRESS || '127.0.0.1';

// Check if necessary environment variables are set
if (!stripeSecretKey || !stripePublicKey) {
  console.error('Stripe keys are missing from environment variables');
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());

app.set('view engine', 'ejs');

app.use(express.static('public')); // Ensure correct path

app.use(express.json());

// Load products from JSON file with error handling
let products;
try {
  products = JSON.parse(fs.readFileSync('api/products.json'));
} catch (error) {
  console.error('Error reading products.json:', error);
  products = [];
}

// Serve products as JSON
app.get('/api/products', (req, res) => {
  res.json(products);  // Send products as JSON
});

// Start the server
app.listen(PORT, IP_ADDRESS, () => {
  console.log(`App is running on http://${IP_ADDRESS}:${PORT}/`);
});
