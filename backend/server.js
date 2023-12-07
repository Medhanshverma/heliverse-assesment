const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://medhanshv03:pA4n2FiFKSGhBDyx@cluster0.ikirynh.mongodb.net/heliverse", { 
    useNewUrlParser: true 
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});


const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  domain: String,
  avatar: String,
  gender: String,
  available: Boolean,
});

const User = mongoose.model('User', userSchema);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// server.js
app.get('/api/users', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const users = await User.find().sort({ id: 1 }).skip(skip).limit(limit);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.available = !user.available;

    const updatedUser = await user.save();

    res.json(updatedUser.available);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



  
    

app.get('/api/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

  
      res.json(user);
    } catch (error) {
      
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  
 