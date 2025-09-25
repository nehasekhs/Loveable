require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL]
  : ["http://localhost:5173", "http://localhost:4173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// DB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const profile=require("./routes/profile");
app.use("/api/profile",profile);

// New domain routes
app.use("/api/projects", require("./routes/projects"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/reviews", require("./routes/reviews"));

// Example protected route
const requireAuth = require("./middleware/auth");
app.get("/api/protected", requireAuth, (req, res) => {
  res.json({ message: "You are authorized!", userId: req.userId });
});

// Socket.IO events
io.on("connection", (socket) => {
  // join-room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  // document-change -> receive-change
  socket.on("document-change", ({ roomId, delta }) => {
    socket.to(roomId).emit("receive-change", delta);
  });

  // chat-message
  socket.on("chat-message", ({ roomId, message }) => {
    io.to(roomId).emit("chat-message", message);
  });
});

// Server start
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
