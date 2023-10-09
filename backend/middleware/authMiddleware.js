import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

//protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //Read token from header
  token = req.cookies.jwt;

  //check if token exists and starts with Bearer
  if (token) {
    try {
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user from db
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

//Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };