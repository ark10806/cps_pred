var mysql = require('mysql');

function exec_sql(temp){
	var con = mysql.createConnection({
		host:	'localhost',
		user:	'root',
		password: '1234',
		database: 'mysql'
	});
	con.connect(function(err){
		if(err)throw err;
		console.log("connected!");
	});
	console.log("tmp: " + temp);
	var sql = "SELECT * FROM node_test";
	con.query(sql, function(err, rows, fields){
		if(err){
			console.log("query failed");
			console.log(err);
		} else{
			console.log(rows);
		}
	});

	con.end();
}

module.exports = exec_sql;
