require('dotenv').config();  // Load environment variables from .env file

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const PORT = process.env.PORT || 5000;
const IP_ADDRESS = process.env.IP_ADDRESS || '127.0.0.1';


const express = require('express');
const cors = require('cors');
const path = require('path')
const fs = require('fs')
const app = express();

app.use(cors());

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());

app.get('/api/products', (req, res) => {
  const filePath = path.join(__dirname, 'products.json');  // Path to the JSON file

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading products data' });
    }

    const products = JSON.parse(data);  // Parse JSON data
    res.json(products);  // Send products data as JSON response
  });
});


// Start the server
app.listen(PORT, IP_ADDRESS, () => {
  console.log(`App is running on http://${IP_ADDRESS}:${PORT}/`);
});
