// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config(); // /!\ Everything that use `process.env` should be put after this line!!!

const decodeJwt = require('./middleware/decodeJwt.middleware')
const { isAuthenticated } = require('./middleware/jwt.middleware');

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

app.use(decodeJwt);

// 👇 Start handling routes here
app.use("/api", require("./routes/index.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/api/tasks", isAuthenticated, require("./routes/tasks.routes"));
app.use("/api", isAuthenticated, require("./routes/settings.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
