/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for IBM i
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// Connect to DB2 for i ------------------------------------------------------------------
// DB2 for i driver
var db = require('/QOpenSys/QIBM/ProdData/OPS/Node4/os400/db2i/lib/db2');

db.init(function(){
	db.serverMode(true); //Enable Server Mode if needed
});

console.log ("DB2 init done");
db.conn("*LOCAL");
console.log ("DB2 connect done");

// Web Service #1 ------------------------------------------------------------------------

app.get('/system/cpu', function(req, res, next) {
    // replace following line with you Web Service code
    res.json(204);
});

// Web Service #2 ------------------------------------------------------------------------

app.get('/system/asp', function(req, res, next) {
    // replace following line with you Web Service code
    res.json(204);
});

// ---------------------------------------------------------------------------------------

// hereunder, replace  19880 by TCP port you want to use
var ServerPort = 19880;

// start server on the specified port and binding host
app.listen(ServerPort, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("Server starting on " + ServerPort);
});

// Handle exit events --------------------------------------------------------------------

process.on('SIGINT', function () {
  console.log('SIGINT fired')
  process.exit(1)
});

process.on('exit', function () {
  console.log('Exit fired');
  console.log ("Close DB connection...");
  db.close();
});

// ---------------------------------------------------------------------------------------
