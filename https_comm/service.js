var DB = require('./db');
var PLC = require('./db');
var CLNT = require('./db');
var timestamp = require('unix-timestamp');

let db = DB();
/*
fur_ID	0~N
operN	1~M
*/

let total_furnaces = 8;

class Furnaces{
	//
	constructor(total_furnaces){
		this.operation_cycle = 0;
		this.furnace_operNum = [];
		for(var i=0; i<total_furnaces; i++)
			this.furnace_operNum.push(-1); 		//async DB.operation No로부터 받아와.
	}

	async function init(){ //server가 재시작되었을 때를 대비하여 첫 시작 시 마지막 operation_No를 찾는다.
		// 이 과정은 최댓값을 찾는 과정으로, O(logn)-time이 소요되므로, 첫 연결에만 불러온다.
		console.log("Getting an operation cycle from DB..");
		sql = `SELECT operation_No FROM process_archive order by operation_No desc limit 1`;
		var result = db.exec_sql(sql);
		console.log("operation cycle- Completely loaded.";
		return;
	}
	async function start(fur_ID, mat_ID, proc_ID, amout, feedback, span){
		if(this.furnace_operNum[fur_ID] == -1)
			return;
		this.operation_cycle++;
		this.furnaceStatus[fur_ID] = operation_cycle;

		sql = `INSERT INTO process_archive VALUES(0, ${fur_ID}, ${mat_ID}, ${proc_ID}, ${amount}, ${feedback}, ${span})`
		db.exec_sql(sql);
	}
	function insert_values(fur_ID, t, press, flow, is_closed){
		if(this.furnaceStatus[fur_ID] == -1):
			return;
		sql = `INSERT INTO archive_fur${fur_ID} VALUES(0, ${timestamp.now()/1000}, ${t[0]}, ${t[1]}, ${t[2]}, ${t[3]}, ${t[4]}, ${t[5]}, ${press}, ${flow}, ${is_closed})`
		db.exec_sql(sql);
	}

	async function terminate(fur_ID){
		this.furnace_operNum[fur_ID] = -1;
		sql = `DELETE FROM process_archive WHERE operation_No=${this.furnace_operNum[fur_ID]}`;
		db.exec_sql(sql);
	}
}

class PLC{
	constructor(total_furnace){
		timestamp.round = true;
	}

	function init(fur_ID){
	}

	function insert(temp, press){
		console.log("Date.now(): " + timestamp.now());
		var sql = `INSERT INTO curr_fur1 values(${0}, ${timestamp.now()}, ${1}, ${2}, ${3}, ${4}, ${5}, ${6}, ${10}, ${20}, ${true})`
		db.exec_sql(sql);	
	}

class Client{
	constructor(){

	}

	function init(fur_ID){
		var sql = `SELECT * FROM curr_fur${fur_ID}`
		db.exec_sql(sql);
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
		var sql = `INSERT INTO archive_fur${fur_ID} values()`
	}
}
module.exports = new Furnaces(total_furnaces);
module.exports = new PLC(total_furnaces);
module.exports = new Clinet();
