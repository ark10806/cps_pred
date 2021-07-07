var mysql = require('mysql');
var timestamp = require('unix-timestamp');

function exec_sql(temp, press){
	var con = mysql.createConnection({
		host:	'localhost',
		user:	'root',
		password: '1234',
		database: 'cps'
	});
	con.connect(function(err){
		if(err)throw err;
		console.log("connected!");
	});
	console.log("tmp: " + temp);
	timestamp.round = true
	console.log("Date.now(): " + timestamp.now());
	var sql = `INSERT INTO curr_fur1 values(${0}, ${timestamp.now()}, ${1}, ${2}, ${3}, ${4}, ${5}, ${6}, ${10}, ${20}, ${true})`
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
