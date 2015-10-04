/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var tableau = require('./tableau.model');

exports.register = function(socket) {
  tableau.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  tableau.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tableau:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tableau:remove', doc);
}