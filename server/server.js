const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const twilio = require('twilio');
const User = require('./models/User');
const Vendor = require('./models/Vendor');
const Booking = require('./models/Booking'); 

const app = express();
app.use(cors());
app.use(express.json());




const accountSid = 'ACb54ee5579135483a65b61fa33cd61157';
const authToken = '62b8cc83efa86dae4177325cd5a7ba33';
const client = twilio(accountSid, authToken);

mongoose.connect('mongodb+srv://muhammadhanzala343:hunny786$@event-manager.nwm81.mongodb.net/eventease', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

// User registration endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
});




const sendWhatsAppMessage = (to, message) => {
  client.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${to}`,
    body: message,
  }).then(message => console.log(`WhatsApp message sent: ${message.sid}`))
    .catch(error => console.error('Error sending WhatsApp message:', error));
};


app.post('/api/bookings/:vendorId', async (req, res) => {
  const { name, contact, eventDate, eventTime, eventType, additionalInfo } = req.body;
  const { vendorId } = req.params;

  if (!name || !contact || !eventDate || !eventTime || !eventType || !vendorId) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  if (!mongoose.Types.ObjectId.isValid(vendorId)) {
    return res.status(400).json({ message: 'Invalid vendor ID' });
  }

  try {
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const newBooking = new Booking({
      name,
      contact,
      eventDate,
      eventTime,
      eventType,
      additionalInfo,
      vendorId,
      vendorName: vendor.name,
    });

    await newBooking.save();

    // Send WhatsApp message to vendor
    const message = `New Booking Received:\n
    Name: ${name}\n
    Contact: ${contact}\n
    Event Date: ${eventDate}\n
    Event Time: ${eventTime}\n
    Event Type: ${eventType}\n
    Additional Info: ${additionalInfo || 'N/A'}`;

    sendWhatsAppMessage(vendor.contactInfo, message);

    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});




// Get vendors by category (Decor example)
  app.get('/api/vendors', async (req, res) => {
    try {
        const vendors = await Vendor.find({ categoryName: 'Decor' });
        res.json(vendors);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

// Get a specific vendor by ID
app.get('/api/vendors/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});



app.listen(5000, () => console.log('Server running on port 5000'));
