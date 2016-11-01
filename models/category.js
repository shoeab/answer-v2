var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var catgorySchema = new Schema({
  title:    { type: String, required: true },
  description:     { type: String },
  status: { type: String, enum: ['active', 'inactive'] },
  created_at:  { type: Date, default: Date.now },
  updated_at:  { type: Date, default: Date.now }
  
});

module.exports = mongoose.model('Category', catgorySchema);