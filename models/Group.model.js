const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required.'],
	},
	subject: {
		type: String,
		required: [true, 'Subject is required'],
	},
	startDate: {
		type: Date,
		required: [true, 'Start date is required'],
	},
	endDate: {
		type: Date,
	},
});

const Group = model('Group', groupSchema);

module.exports = Group;
