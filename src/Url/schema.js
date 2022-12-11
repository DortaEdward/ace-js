const { Schema, model } = require('mongoose');

const urlSchema = new Schema({
  originalUrl: {type: String, required:true},
  shorten: {type: String, required: true}
});

module.exports = model('urls', urlSchema);