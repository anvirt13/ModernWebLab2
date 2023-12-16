const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to MongoDB with the appropriate connection string including the database name
mongoose.connect('mongodb+srv://anvirtiwana13:NawlMia123@cluster0.kvtku1u.mongodb.net/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => {
  console.error('Error occurred while connecting to MongoDB:', err);
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'], 
    default: 'user', 
  },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Create the User model using the userSchema and specify the collection name
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
