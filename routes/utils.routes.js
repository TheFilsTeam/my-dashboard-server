const express = require('express');
const router = express.Router();

// Require the User model in order to interact with the database
const User = require('../models/User.model');

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require('../middleware/jwt.middleware.js');
const Timer = require('../models/Timer.model');
const { trusted } = require('mongoose');
var cowsay = require("cowsay-browser");
const { default: axios } = require('axios');

const random = (array) => array[Math.floor(Math.random()*array.length)];
const customCowSay = (text) => cowsay.say({
	text : text,
	e : random(["oO", "==", "XX", "$$", "@@", "**", "--", "OO", "..", "^^", "oo"]),
	T : random(["U ", "  "])
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/cowsay', isAuthenticated, async (req, res, next) => {
	// console.log(`req.payload`, req.payload);

	if (Math.random() < 0.2) {
		const text = customCowSay(random(["is 42 the right answer?", "Who wants to help me?"]));
		res.status(200).json({ text });
		return;
	}

	const users = ["Sherlock Holmes", "Ada Lovelace", "Brendan Eich", "Tim Berners-Lee", "Chuck Norris"];
	const text = customCowSay(random(users) + ", " + random(["an idea?", "can you help me?", "...", "please...", "what do you think?"]));
	res.status(200).json({ text });
});

router.get('/meme', isAuthenticated, async (req, res, next) => {
	// console.log(`req.payload`, req.payload);
	axios.get("https://meme-api.com/gimme")
		.then(response => res.status(200).json(response.data))
		.catch(e => res.set(500).json(e));
});
module.exports = router;
