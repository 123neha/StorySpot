const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: { // ['draft','published']
    type: String,
    required: true
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: Date.now
  },
  createdOn: {
    type: Date,
    required: true
  },
  lastModifiedOn: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Story', StorySchema);
