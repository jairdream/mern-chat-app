const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Channel = require("../models/channelModel");

//@description     Get all Messages
//@route           GET /api/Message/:channelId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ channel: req.params.channelId })
      .populate("sender", "name pic email")
      .populate("channel");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Read Messages
//@route           POST /api/Message/read
//@access          Protected
const readMessages = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  // Validate input
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'Please provide an array of message IDs' });
  }

  try {
    // Update messages excluding those sent by current user
    const updateResult = await Message.updateMany(
      {
        _id: { $in: ids },
        sender: { $ne: currentUserId } // Exclude self-sent messages
      },
      {
        $set: { 
          isReaded: true,
          readAt: new Date()
        },
        $setOnInsert: {
          receiveAt: new Date()
        }
      },
      {
        upsert: false,
        new: true
      }
    );

    // Find skipped messages (self-sent)
    const selfSentCount = await Message.countDocuments({
      _id: { $in: ids },
      sender: currentUserId
    });

    res.status(200).json({
      success: true,
      message: `Marked ${updateResult.modifiedCount} messages as readed`,
      modifiedCount: updateResult.modifiedCount,
      selfExcludedCount: selfSentCount
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, files, channelId } = req.body;

  if (!content || !files || !channelId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    files: files,
    channel: channelId,
    sendAt: Date.now(),
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("channel").execPopulate();
    message = await User.populate(message, {
      path: "channel.users",
      select: "name pic email",
    });

    await Channel.findByIdAndUpdate(req.body.channelId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage, readMessages };
