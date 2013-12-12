'use strict';

// var statik = require('statik');
// var server = statik.createServer('.');
// server.listen();

var express = require("express");
var app = express();

app.use(express.static(__dirname + '/'));

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});