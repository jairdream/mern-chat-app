const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Channel = require("../models/channelModel");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const { generateAccessToken, generateRefreshToken } = require("../config/generateTokens");
const { generateOTP } = require("../utils/otpGenerator");
const { sendGmail } = require("../utils/emailService");

//@description     Get all users
//@route           GET /api/auth/admin
//@access          Public
const adminUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ isVerified:true, isAdmin: true });
  res.send(user._id);
});

//@description     Get all users
//@route           GET /api/auth/all
//@access          Private
const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isVerified:true, _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Search all users
//@route           GET /api/auth/search?keyword=
//@access          Private
const searchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ isVerified:true, _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Get or Search all users
//@route           GET /api/auth/one/{userId}
//@access          Public
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Register new user
//@route           POST /api/auth/register
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirm, pic } = req.body;

  console.log(req.body);

  if (!name || !email || !password || !confirm) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  if (password !== confirm) {
    res.status(400);
    throw new Error("Password confirm not equals.");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  console.log("userExists", userExists);

  const user = await User.create({
    name,
    email,
    password,
    pic
  });

  if (user) {
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    user.otp = generateOTP();
    await user.save();

    sendGmail(user.email, user.otp);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      otp: user.otp,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateAccessToken(user._id),
      refreshToken: refreshToken,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Verify user
//@route           POST /api/auth/verify
//@access          Public
const verifyUser = asyncHandler(async (req, res) => {
  const { code } = req.body;
  const user = await User.findById(req.user._id);
  if (user.otp === code) {
    user.isVerified = true
    await user.save();
    console.log("New User Verified");
    const result = await Channel.updateOne(
      { _id: productChannel._id },
      { $addToSet: { users: user._id } } // Atomic update
    );
    console.log("New User Added to product channel");
    res.json(user)
  } else {
    res.status(403).json({ message: "Code is invalid"});
  }
});

//@description     Auth the user
//@route           POST /api/auth/login
//@access          Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  
  if (user && (await user.matchPassword(password)) && user.isVerified) {
    user.refreshToken = generateRefreshToken(user._id);
    await user.save();

    const productChannel = await Channel.findOne({ isProductChannel: true });
    if (!productChannel) {
      const allUsers = await User.find({ isVerified: true });
      const userIds = allUsers.map(user => user._id);
      await Channel.create({
        isProductChannel: true,
        name: "product channel",
        users: userIds,
        isPinned: true
      });
      console.log("Product Channel created");
    } else {
      console.log("Product channel is already created.");
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateAccessToken(user._id),
      refreshToken: user.refreshToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Update the user
//@route           POST /api/auth/update
//@access          Private
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name;
    user.email = email;
    user.password = password;
    user.pic = pic || user.pic;
    user.refreshToken = generateRefreshToken(user._id);

    // Save the updated user
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      pic: updatedUser.pic,
      token: generateAccessToken(updatedUser._id),
      refreshToken: updatedUser.refreshToken,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@description     Refresh tokens
//@route           POST /api/auth/refresh
//@access          Private
const refreshSign = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400);
    throw new Error("Please send refresh token");
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
    );

    const user = await User.findById(decoded.id);
    if (!user || refreshToken != user.refreshToken) {
      res.status(401);
      throw new Error("Invalid refresh token");
    }

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      token: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { adminUser, allUsers, searchUsers, getUserById, registerUser, loginUser, verifyUser, updateUser, refreshSign };
