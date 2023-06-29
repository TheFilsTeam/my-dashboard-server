const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
  finishedDate: {
    type: Date,
    default: undefined
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: [true, "User is required."] },
});

module.exports = model('Task', taskSchema);
