'use strict';

var express = require('express');


exports.index = function(req, res) {

  var fs = require("fs");
  
  var content = fs.readFileSync("server/api/tableau/tableaux.json");

  return res.status(200).json(content);
};

// Query the DB
