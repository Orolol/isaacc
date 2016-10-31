/**
 * Main application routes
 */

 'use strict';

 var errors = require('./components/errors');
 var path = require('path');
 var tableau = require('./api/tableau');

 module.exports = function(app) {

  // Insert routes below
  // app.use('/api/tableau', require('./api/tableau'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  .get(errors[404]);

  app.route('/lib/:libname').get(function(req, res) {
    console.log("1");
    console.log(libname);
    res.sendFile(path.resolve(app.get('appPath') + '/lib/' + libname));
  });

  app.route('/index/').get(function(req, res) {
    res.sendFile(path.resolve(app.get('dataPath') + '/tableaux.json' ));
  });

  app.route('/assets/images/:libname').get(function(req, res) {
    console.log("2");
    console.log(libname);
    res.sendFile(path.resolve(app.get('appPath') + '/assets/images/' + libname));
  });

  app.route('/po/:libname').get(function(req, res) {
    console.log("3");
    console.log(libname);
    res.sendFile(path.resolve(app.get('appPath') + '/po/' + libname));
  });


  app.route('/*')
  .get(function(req, res) {
    res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  });
};
