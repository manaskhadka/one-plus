const express = require('express');
const mongoose = require('mongoose');
const multer = require("multer");
const cors = require('cors');
const fs = require('fs')

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mkhadka:NIWijO1O3kEJ7zly@one-plus-main.1skqfti.mongodb.net/main-data', {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  authorUsername: { type: String, required: true },
  eventImage: {
    data: Buffer,
    contentType: String
  },
  description: { type: String, required: true}
});

// Define a unique compound index for the combination of title, date, and authorUsername
EventSchema.index({ title: 1, date: 1, authorUsername: 1 }, { unique: true });
const EventModel = mongoose.model("Event", EventSchema);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  userImage: {
    data: Buffer,
    contentType: String
  },
  savelist: [EventSchema],
  rsvplist: [EventSchema]
});


const UserModel = mongoose.model("User", UserSchema);


// Endpoint to get all events (for main page right window)
app.get('/events', async (req, res) => {
  try {
    const events = await EventModel.find();
    res.json(events)
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to get a single user's data 
app.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await UserModel.findOne({username: username});
    console.log(`atempt to find user: ${username}`, user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to create a new event
app.post('/event', upload.single('eventImage'), async (req, res) => {
  const { title, date, location, authorUsername, description } = req.body;

  try {
    // Check if the combination of title, date, and authorUsername is unique
    // (This makes it so that a single user cannot create multiple copies of the same event at the same date)
    const existingEvent = await EventModel.findOne({ title, date, authorUsername });
    if (existingEvent) {
      console.log("Did not create event; event already exists")
      return res.status(400).json({ error: 'Event already exists' });
    }

    const newEvent = new EventModel({
      title,
      date,
      location,
      authorUsername,
      eventImage: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      },
      description
    });

    await newEvent.save();
    console.log("EVENT CREATED")
    return res.json({ message: 'Event saved', event: newEvent });
  } catch (error) {
    console.error('Error saving event:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to register a new user (adds a single user)
app.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = new UserModel({
      username,
      password, // NOTE: Should hash this for security
      userImage: req.file ? {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      } : undefined,
    });

    await user.save();
    console.log("USER REGISTERED!!")
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ONLY FOR DEBUGGING: Endpoint to create and save a test user 
app.get('/create-test-user', async (req, res) => {
  console.log("creating test user")
  try {
    // Hardcoded test user data
    const testUserData = {
      username: 'test',
      password: 'password123',
      userImage: { data: null, contentType: null },
      savelist: [],
      rsvplist: []
    };
    
     // Load the image file from the directory
     const imagePath = '../public/assets/default-profile.jpg'; // Replace this with the path to your image file
     const imageData = fs.readFileSync(imagePath);
 
     // Set the image data and content type in the testUserData
     testUserData.userImage.data = imageData;
     testUserData.userImage.contentType = 'image/jpeg'; // Set the content type according to the image type

    // Create a new test user using the hardcoded data
    const testUser = new UserModel(testUserData);

    // Save the test user to the database
    await testUser.save();
    console.log("SAVED USER")

    return res.json({ message: 'Test user created successfully', user: testUser });
  } catch (error) {
    console.error('Error creating test user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
