const express = require("express");
const router = express.Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Timer = require("../models/Timer.model");

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/settings", isAuthenticated, async (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  // console.log(`req.payload`, req.payload);

  const timers = await Timer.find({owner: req.payload._id});

  const settings = {...req.__jwt_user, timers: timers }
  // console.log("user loaded", settings);

  // Send back the token payload object containing the user data
  res.status(200).json(settings);
});

router.put("/settings", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);
  console.log(`req.body (data to update)`, req.body);
  User.findByIdAndUpdate(req.payload._id, req.body)
    .then(u => {
      res.status(200);
    })
    .catch(e => {
      console.error("Error while updating user settings", e);
      restart.status(500).json(e);
    })
});

module.exports = router;
