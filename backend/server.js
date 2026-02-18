const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();
// Initialize the Express app
const app = express();

// 1. Connect to the Database
connectDB();

// 2. Initialize Middleware
app.use(cors()); // Allows your frontend to make requests to this backend
app.use(express.json()); // Allows the server to accept JSON data

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;
const toNumber = process.env.TWILIO_TO_NUMBER; // Emergency contact number

let client;
if (accountSid && authToken) {
  client = new twilio(accountSid, authToken);
  console.log('Twilio client initialized.');
} else {
  console.warn('Twilio credentials not found in .env. SOS feature will be disabled.');
}
// -------------------------------------

// A simple welcome route to check if the server is running
app.get('/', (req, res) => res.send('API is running...'));

// --- 4. DEFINE SOS ROUTE ---
app.post('/api/sos', (req, res) => {
  if (!client) {
    return res.status(500).send({ message: ' Twilio service is not configured on the server.' });
  }

  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).send({ message: ' Latitude and Longitude are required.' });
  }

  // Use a standard Google Maps link
  const message = `🚨 EMERGENCY! Ambulance needed at: http://maps.google.com/maps?q=${lat},${lng}`;

  client.messages
    .create({
      body: message,
      from: fromNumber,
      to: toNumber
    })
    .then(() => {
      res.status(200).send({ message: '✅ SOS sent successfully!' });
    })
    .catch(err => {
      console.error('Twilio Error:', err);
      res.status(500).send({ message: '❌ Failed to send SOS.' });
    });
});
// ----------------------------
// A simple welcome route to check if the server is running
app.get('/', (req, res) => res.send('API is running...'));

// 3. Define the main API route from our routes file
app.use('/api', require('./routes/data.routes'));

app.use('/api/appointments', require('./routes/appointment.routes'));

app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/beds', require('./routes/bed.routes'));

app.use('/api/bloodbank', require('./routes/bloodbank.routes'));

const PORT = process.env.PORT || 3000;

// 4. Start the server
app.listen(PORT, () => console.log(`Backend server started on http://localhost:${PORT}`));