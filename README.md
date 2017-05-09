# Node.js IBM i simple API

This application demonstrates a simple, reusable Node.js web application based on the Express framework.
It's a template you can use during hands-on, demonstrating how to create REST web service on IBM i with Node.js and SQL.

2 APIs should be exposed, created with simple DB2 for i SQL requests.

## Complete the app

You have first to complete the code.<BR>
2 web services are defines. 
+ The first to retrieve elapsed cpu used
+ The second to retrieve system asp used

Example of code (retrieve % ASP used):<BR>

		var result = {};
		var sql = "SELECT system_asp_used FROM QSYS2.SYSTEM_STATUS_INFO"; 
		try {
			console.log("SQL: " + sql);
			db.exec(sql, function(rs) {       
				console.log (JSON.stringify(rs));
				if(rs.length != 0) {
					res.json(rs[0]);
				} else {
					res.json(500);
				}
			});
		} catch(e) {  // Exception handler
   		     console.log("Error: " + e);
      		  res.json(500);
		}
 
## Run the app locally

1. [Install Node.js][]
+ cd into this project's root directory
+ Run `npm install` to install the app's dependencies
+ Run `npm start` to start the app
+ Access the running app in a browser at <http://localhost:xxxx>

[Install Node.js]: https://nodejs.org/en/download/
