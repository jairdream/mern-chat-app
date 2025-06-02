const asyncHandler = require("express-async-handler");
const History = require("../models/historyModel");

//@description     Create new Messages
//@route           POST /api/history
//@access          Protected
const addHistory = asyncHandler(async (req, res) => {
  const { productId, userId, amount } = req.body;

  // Validate input
  if (!productId || !userId || !amount ) {
    return res.status(400).json({ error: 'Please provide an array of message IDs' });
  }

  try {
    // Update messages excluding those sent by current user
    var history = await History.create(
      {
        user: userId,
        product: productId,
        amount: amount,
      }
    )
    history = await history.populate("user", "-password -refreshToken").execPopulate();
    res.json(history);
  } catch(error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Read Messages
//@route           GET /api/history/:userId
//@access          Protected
const allHistories = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  // Validate input
  if ( !userId ) {
    return res.status(400).json({ error: 'Please provide userId' });
  }

  try {
    // Update messages excluding those sent by current user
    const histories = await History.find({ user: userId })
      .populate("user", "--password");
    console.log(histories);
    res.json(histories);
  } catch(error) {
    res.status(400);
    console.log(error);
    throw new Error(error.message);
  }
});

module.exports = { addHistory, allHistories };