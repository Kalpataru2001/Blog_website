const router = require('express').Router();
const { register, login } = require('../controllers/auth');

// Register
router.post('/signup', register);

// login
router.post('/login', login);

module.exports = router;
