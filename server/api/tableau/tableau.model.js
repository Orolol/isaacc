'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tableauSchema = new Schema({
  nom: String,
  info: String,
  type: String,
  dateRealisation: Date,
  description: String,
  categoriePrincipale String,
  active: Boolean
});

module.exports = mongoose.model('tableau', tableauSchema);