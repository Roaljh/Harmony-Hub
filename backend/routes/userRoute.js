const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/userController');

// POST (create a new user - registration)
router.post('/signup', createUser);

// POST (login user)
router.post('/login', loginUser);

module.exports = router;
