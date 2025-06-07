const asyncHandler = require("express-async-handler");
const Channel = require("../models/channelModel");
const User = require("../models/userModel");

//@description     Create or fetch One to One Channel
//@route           POST /api/channel/
//@access          Protected
const accessChannel = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChannel = await Channel.find({
    isProductChannel: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChannel = await User.populate(isChannel, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChannel.length > 0) {
    res.send(isChannel[0]);
  } else {
    var channelData = {
      name: "message channel",
      isProductChannel: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChannel = await Channel.create(channelData);
      const FullChannel = await Channel.findOne({ _id: createdChannel._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChannel);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

//@description     Fetch all channels for a user
//@route           GET /api/channel/
//@access          Protected
const fetchChannels = asyncHandler(async (req, res) => {
  try {
    Channel.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Toggle pin status of channel
//@route           POST /api/channel/togglepin/{channelId}
//@access          Protected
const togglePin = asyncHandler(async (req, res) => {
  try {
    // Find the channel by ID
    const channel = await Channel.findById(req.params.channelId);

    // If the channel doesn't exist, return a 404 error
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    // Toggle the isPinned status
    channel.isPinned = !channel.isPinned;

    // Save the updated channel
    await channel.save();

    // Return the updated channel
    res.json(channel);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  accessChannel,
  fetchChannels,
  togglePin
}
