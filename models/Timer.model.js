const { Schema, model } = require('mongoose');

const timerSchema = new Schema({
  title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "Duration is required."],
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: [true, "User is required."] },
});

module.exports = model('Timer', timerSchema);
