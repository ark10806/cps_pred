var mysql = require('mysql');
var timestamp = require('unix-timestamp');

let resutl
class DB{
	constructor(){
		this.conn;
	}
	function exec_sql(sql){
		this.conn = mysql.createConnection({
			host:	'localhost',
			user:	'root',
			password: '1234',
			database: 'cps'
		});
		conn.connect(function(err){
			if(err)throw err;
		});
		console.log("connected!");
		con.query(sql, function(err, rows, fields){
			if(err){ console.log(err); } else{ console.log(rows); }
		});
		con.end();
		return rows;
	}
}

class PLC{
	constructor(total_furnace){
		this.furnaceStatus = [];
		for(var i=0; i<total_furnace; i++)
			this.furnaceStatus.push(false);
	}

	function init(fur_ID){
		this.furnaceStatus[fur_ID] = true;
		const con = conn_DB();
		sql = `INSERT INTO process_archive VALUES(0, ${fur_ID}, ${mat_ID}, ${proc_ID}, ${amount}, NULL, ${span})`
		con.query(sql, function(err, rows, fields))
		

	function plc_insert(temp, press){
		const con = conn_DB();
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

function clnt_init(fur_ID){
	const con = conn_DB();
	var sql = `SELECT * FROM curr_fur${fur_ID}`
	con.query(sql, function(err, rows, fields){
		if(err){ console.log(err); } else{ console.log(rows); }
	});
	con.end();
}

function clnt_curr(fur_ID){
	const con = conn_DB();
	var sql = `SELECT * FROM curr_fur${fur_ID}`
	con.query(sql, function(err, row, fields){
		if(err){ console.log(err); } else{ console.log(rows); }
	});
	con.end();
}

function clnt_terminate(fur_ID){
	const con = conn_DB();
	var sql = `INSERT INTO archive_fur${fur_ID} values()`;

module.exports = exec_sql_insert;
