const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, '1223456565665');
      //Note: 'abc123' is a JWT_secret var supposed to be in .env file, but added it here, for mentors to be able to see it and check it

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authoried, no token');
  }
});

module.exports = { protect };
