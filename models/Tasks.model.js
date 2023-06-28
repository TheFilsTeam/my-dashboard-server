const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Title is required.'],
		trim: true,
	},
	finishedDate: Date,
	project: { type: Schema.Types.ObjectId, ref: 'Group' },
});

module.exports = model('Task', taskSchema);
