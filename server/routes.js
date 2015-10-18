/**
 * Main application routes
 */

 'use strict';

 var errors = require('./components/errors');
 var path = require('path');

 module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  .get(errors[404]);

  app.route('/lib/:libname').get(function(req, res) {
    res.sendFile(path.resolve(app.get('appPath') + '/lib/' + libname));
  });

  app.route('/assets/images/:libname').get(function(req, res) {
    res.sendFile(path.resolve(app.get('appPath') + '/assets/images/' + libname));
  });

  app.route('/po/:libname').get(function(req, res) {
    res.sendFile(path.resolve(app.get('appPath') + '/po/' + libname));
  });
  

  app.route('/*')
  .get(function(req, res) {
    res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  });
};
