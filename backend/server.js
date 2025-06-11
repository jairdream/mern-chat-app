const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const channelRoutes = require("./routes/channelRoutes");
const fileRoutes = require("./routes/fileRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const historyRoutes = require("./routes/historyRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

dotenv.config();
connectDB();
const app = express();
// Open CORS configuration
app.use(cors({
  origin: "*",     // Allow any domain
  methods: "*",    // Allow all HTTP methods
  credentials: true
}));
app.use(express.json()); // to accept json data

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/file", fileRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/history", historyRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.use('/backend/uploads', express.static(path.join(__dirname, 'uploads')));
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  '0.0.0.0',
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io from: ", socket.conn.remoteAddress);

  socket.userId = null;
  socket.userChannels = new Set();

  socket.on("setup", (userData) => {
    const rooms = Object.keys(socket.rooms);
    if (!rooms.includes(userData._id)) {
      socket.join(userData._id);
      console.log("User setup with id: ", userData._id);
    } else {
      console.log("User Already setup with id: ", userData._id);
    }
    socket.join(userData._id);
    socket.userId = userData._id;

    socket.userChannels.forEach(channel => {
      socket.to(channel).emit("user online", {
        userId: socket.userId,
        channel: channel
      });
    });
    socket.emit("connected");
  });

  socket.on("join channel", (room) => {
    const rooms = Object.keys(socket.rooms);
    if (!rooms.includes(room)) {
      socket.join(room);
      socket.userChannels.add(room); 
      console.log("User Joined Room: " + room);
    } else {
      console.log("User already in Room: " + room);
    }
  });

  socket.on("typing", (room) => {
    console.log("typing");
    console.log(room);
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    console.log("new message");
    var channel = newMessageRecieved.channel;
    console.log("in channel: ", channel);
    if (!channel.users) return console.log("channel.users not defined");

    channel.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on("update message", (newMessageUpdated) => {
    console.log("update message");
    var channel = newMessageUpdated.channel;
    console.log("in channel: ", channel);
    if (!channel.users) return console.log("channel.users not defined");

    channel.users.forEach((user) => {
      if (user._id == newMessageUpdated.sender._id) return;
      socket.in(user._id).emit("message updated", newMessageUpdated);
    });
  });

  socket.on("read message", (messageRead) => {
    console.log("read message");
    socket.in(messageRead.reciever._id).emit("message viewed", messageRead);
  });

  socket.on("status", (messageRead) => {
    console.log("status change");

    socket.in(messageRead.reciever._id).emit("message viewed", messageRead);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });

  socket.on("user offline", () => {
    console.log(`User ${socket.userId} goes offline`);

    // Broadcast to all channels
    socket.userChannels.forEach(channel => {
      socket.to(channel).emit("user offline", {
        userId: socket.userId,
        channel: channel
      });
    });
  });

  socket.on("user online", () => {
    console.log(`User ${socket.userId} is online`);

    // Broadcast to all channels
    socket.userChannels.forEach(channel => {
      socket.to(channel).emit("user online", {
        userId: socket.userId,
        channel: channel
      });
    });
  });

  socket.on("disconnect", () => {
    if (!socket.userId) return;

    console.log(`User ${socket.userId} disconnected`);

    // Broadcast to all channels
    socket.userChannels.forEach(channel => {
      socket.to(channel).emit("user offline", {
        userId: socket.userId,
        channel: channel
      });
    });
  });
});
