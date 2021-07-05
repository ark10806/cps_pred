var mysql = require('mysql');
var conn = mysql.createConnection({

	//host:		'165.246.44.142:3306',
	host:		'165.246.44.142',
	port:		3306,
	user:		'root',
	password:	'13130132',
	database:	'cps'
});

conn.connect();

conn.query('SECECT * FROM cps', function(error, results, fields){
	if(error){
		console.log(error);
	}
	console.log(results);
});

conn.end();
