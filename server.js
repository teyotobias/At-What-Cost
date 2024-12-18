const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

//connect to db
require("./config/database");

// Initialize Redis
const redisClient = require("./config/redis");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
// Serve static files from the build directory (probably for your React or other frontend framework build)
app.use(express.static(path.join(__dirname, "build")));

// Serve static files from the public directory
app.use("/public", express.static(path.join(__dirname, "public")));
// Middleware to verify token and assign user object of payload to req.user.
app.use(require("./config/checkToken"));

const port = process.env.PORT || 3001;

// API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/items", require("./routes/api/items"));
app.use("/api/orders", require("./routes/api/orders"));
//protect api routes from anon users:
// const ensureLoggedIn = require("./config/ensureLoggedIn");
//The following "catch all" route * is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
