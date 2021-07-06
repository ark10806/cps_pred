var mysql = require('mysql');

function exec_sql(temp, press){
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
	console.log("Date.now(): " + Date.now());
	var sql = `INSERT INTO furnace1 values(${Date.now()}, ${temp}, ${press})`
	//var sql = "SELECT * FROM node_test";
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
