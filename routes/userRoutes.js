const express = require('express');
const router = express.Router();
const {
  loginUser,
  getMe,
  registerUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.get('/me', protect, getMe);

module.exports = router;
