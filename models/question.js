var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var questionSchema = new Schema({
  title:    { type: String, required: true },
  description:     { type: String },
  summary:  { type: String },
  created_at:  { type: Date, default: Date.now },
  updated_at:  { type: Date, default: Date.now },
  category:   { type : Array , "default" : [] },
  status: { type: String, enum: ['active', 'inactive'] }
  
});

module.exports = mongoose.model('Question', questionSchema); 
