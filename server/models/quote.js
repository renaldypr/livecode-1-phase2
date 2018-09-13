const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var quoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  }]
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;