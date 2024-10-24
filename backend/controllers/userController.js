const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

// Create a new user (Registration)
const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save the new user
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword
        });

        await newUser.save();
    
        return res.status(201).json({ message: 'User created successfully', redirectUrl: 'http://localhost:4000/dashboard' });

    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Return success message if login is successful

    return res.status(201).json({ message: 'User logged in successfully', redirectUrl: 'http://localhost:4000/dashboard' });
};

module.exports = {
    createUser,
    loginUser
};
