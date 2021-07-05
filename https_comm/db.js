var mysql = require('mysql');

var con = mysql.createConnection({
	host:	'165.246.44.142',
	port:	3306,
	user:	'plc',
	password: '1234',
	database: 'tmp_plc'
});

con.connect(function(err){
	if(err)throw err;
	console.log("connected!");
});

var sql = "SELECT * FROM cpscps";
con.query(sql, function(err, rows, fields){
	if(err){
		console.log("query failed");
		console.log(err);
	} else{
		console.log(rows);
	}
});

con.end();
