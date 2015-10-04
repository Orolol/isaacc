/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /tableaus              ->  index
 * POST    /tableaus              ->  create
 * GET     /tableaus/:id          ->  show
 * PUT     /tableaus/:id          ->  update
 * DELETE  /tableaus/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var tableau = require('./tableau.model');

// Get list of tableaus
exports.index = function(req, res) {
  tableau.find(function (err, tableaus) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(tableaus);
  });
};

// Get a single tableau
exports.show = function(req, res) {
  tableau.findById(req.params.id, function (err, tableau) {
    if(err) { return handleError(res, err); }
    if(!tableau) { return res.status(404).send('Not Found'); }
    return res.json(tableau);
  });
};

// Creates a new tableau in the DB.
exports.create = function(req, res) {
  tableau.create(req.body, function(err, tableau) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(tableau);
  });
};

// Updates an existing tableau in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  tableau.findById(req.params.id, function (err, tableau) {
    if (err) { return handleError(res, err); }
    if(!tableau) { return res.status(404).send('Not Found'); }
    var updated = _.merge(tableau, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(tableau);
    });
  });
};

// Deletes a tableau from the DB.
exports.destroy = function(req, res) {
  tableau.findById(req.params.id, function (err, tableau) {
    if(err) { return handleError(res, err); }
    if(!tableau) { return res.status(404).send('Not Found'); }
    tableau.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}