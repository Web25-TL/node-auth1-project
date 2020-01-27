const express = require("express");
// hides what packages we're using.
const helmet = require("helmet");
// For Stretch
const cors = require("cors");
// global middleware
const { restricted } = require("./auth/middleware.js");

// really awesome logger, check it out on npm https://www.npmjs.com/package/morgan
const morgan = require("morgan");

// Tuesday's MVP
const session = require("express-session");

// importing routes
const AuthRouter = require("./auth/route.js");
const UsersRouter = require("./users/route.js");

const server = express();

// 12 - 22 is for Tuesday's MVP.
const sessionConfig = {
  name: "shortbreadalmondcookies",
  secret: "happybirthdayfrosty",
  cookie: {
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000,
    secure: false
  },
  resave: false,
  saveUninitialized: true
};

// Global middleware
server.use(session(sessionConfig)); // for Tuesday's with sessions and cookies -- not recommended for build week.
// all needed for MVP
server.use(express.json());
server.use(helmet());
server.use(cors()); // needed for React App stretch.
server.use(express());
server.use(moragn(dev));

// delcaring routes with middleware
server.use("/api/auth", AuthRouter);
server.use(restricted()); // all routes pass here user must be logged in. Also global middleware.
server.use("/api/users", UsersRouter);

module.exports = server;
