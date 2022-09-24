const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Item Schema
const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

// Export the model for use in other files
module.exports = mongoose.model('Item', itemSchema);
