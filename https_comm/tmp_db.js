var mysql = require('mysql');
//
var con = mysql.createConnection({
	host:	'165.246.44.142',
	port:	3306,
	user:	'root',
	password: '13130132',
	database: 'mysql'
});

con.connect(function(err){
	if(err)throw err;
	console.log("connected!");
});

var sql = "SELECT * FROM event";
con.query(sql, function(err, rows, fields){
	if(err){
		console.log("query failed");
		console.log(err);
	} else{
		console.log(rows);
	}
});

con.end();
