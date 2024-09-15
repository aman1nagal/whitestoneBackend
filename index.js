require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const { handleErrors } = require("./middleware/errorHandler");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
// Pass server instance to socket.io
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETEs"],
    credentials: true,
  },
});

app.use(bodyParser.json());
// Middleware for real-time updates
app.use((req, res, next) => {
  req.io = io;
  next();
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Parse JSON
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerDocument = YAML.load("./api-docs.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use(handleErrors);

// Socket.io events
require("./socket/socket")(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
