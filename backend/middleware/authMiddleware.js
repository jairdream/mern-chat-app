const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      if (err.name === 'TokenExpiredError') {
        res.status(401);
        throw new Error("Token expired");
      }
      res.status(403);
      throw new Error("Not authorized, Invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const protectUser = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user.isVerified) {
        res.status(403);
        throw new Error("Not verified user");
      }

      next();
    } catch (error) {
      if (err.name === 'TokenExpiredError') {
        res.status(401);
        throw new Error("Token expired");
      }
      res.status(403);
      throw new Error("Not authorized, Invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user.isVerified) {
        res.status(403);
        throw new Error("Not verified user");
      }

      if (!req.user.isAdmin) {
        res.status(403);
        throw new Error("Not authorized, Your are not Admin");
      }

      next();
    } catch (error) {
      if (err.name === 'TokenExpiredError') {
        res.status(401);
        throw new Error("Token expired");
      }
      res.status(403);
      throw new Error("Not authorized, Invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect, protectUser, protectAdmin };
