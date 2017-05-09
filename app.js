/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// Connect to DB2 for i ------------------------------------------------------------------

// DB2 for i driver
var db = require('/QOpenSys/QIBM/ProdData/OPS/Node4/os400/db2i/lib/db2');

db.init(function(){
	db.serverMode(true); //Enable Server Mode if needed
});

console.log ("DB2 init done");
db.conn("*LOCAL");
console.log ("DB2 connect done");

// ---------------------------------------------------------------------------------------

app.get('/system/cpu', function(req, res, next) {
    var result = {};
    var sql = "SELECT elapsed_cpu_used FROM QSYS2.SYSTEM_STATUS_INFO";
    
    try {
   		console.log("SQL: " + sql);
    	db.exec(sql, function(rs) {	  // Query the statement
      		console.log (JSON.stringify(rs));
			if(rs.length != 0) {
				res.json(rs[0]);
			} else res.json(500);
        });
        console.log ("Done");

     } catch(e) {  // Exception handler
     	console.log("Error: " + e);
    	res.json(500);
  	 }
});

// ---------------------------------------------------------------------------------------

app.get('/system/asp', function(req, res, next) {
    var result = {};
    var sql = "SELECT system_asp_used FROM QSYS2.SYSTEM_STATUS_INFO";
    
    try {
   		console.log("SQL: " + sql);
    	db.exec(sql, function(rs) {	  // Query the statement
      		console.log (JSON.stringify(rs));
			if(rs.length != 0) {
				res.json(rs[0]);
			} else res.json(500);
        });
        console.log ("Done");

     } catch(e) {  // Exception handler
     	console.log("Error: " + e);
    	res.json(500);
  	 }
});


// ---------------------------------------------------------------------------------------

// start server on the specified port and binding host
appEnv.port = 19880;
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.port);
});

// ---------------------------------------------------------------------------------------

process.on('SIGINT', function () {
  console.log('SIGINT fired')
  process.exit(1)
});

process.on('exit', function () {
  console.log('exit fired');
  console.log ("Close DB connection...");
  db.close();
});

// ---------------------------------------------------------------------------------------







