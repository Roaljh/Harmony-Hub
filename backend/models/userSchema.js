const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Define the student schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
    trim: true
  }, 
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
    validate: {
        validator: function (v) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
        },
        message: 'Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters.'
    },
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Export the Student model
module.exports = mongoose.model('user', userSchema);