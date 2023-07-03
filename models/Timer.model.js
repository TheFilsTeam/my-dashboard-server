const { Schema, model } = require('mongoose');

const timerSchema = new Schema({
	type: {
		type: String,
		enum: ['Work', 'Break'],
		required: [true, 'Type is required.'],
	},
	duration: {
		type: Number,
		required: [true, 'Duration is required.'],
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'User is required.'],
	},
});

module.exports = model('Timer', timerSchema);
