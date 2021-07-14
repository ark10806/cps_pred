//const exec_sql = require('./db');
//const exec_sql_ins = require('./db');
DB = require('./db');
var timestamp = require('unix-timestamp');

/*
fur_ID	0~N
operN	1~M
server가 재시작되었을 때를 대비하여 첫 시작 시 마지막 operation_No를 찾는다.
이 과정은 최댓값을 찾는 과정으로, O(logn)-time이 소요되므로, 첫 연결에만 불러온다. 

*/

let total_furnaces = 8;

class Furnaces{
	constructor(total_furnaces = 8){
		this.operation_cycle = 0;
		this.furnace_operNum = [];
		for(var i=0; i<total_furnaces+1; i++)
			this.furnace_operNum.push(-1); 		//async DB.operation No로부터 받아와.
	}
/*
	async get_oper(){
		// db.panel[0] 에서 최근 oepration_No를 가져옴.
	}

	aync set_oper(){
		// 작업 시작 직후 db.panel[0]에  oeration_No를 최신화.
	}
*/
	async init(){ 
		console.log("Getting an operation cycle from DB..");
		var sql = `SELECT operation_No FROM process_archive order by operation_No desc limit 1`;
		var value = await DB.exec_sql(sql);
		console.log(`asdfasdfasdf-${value[0]}-`);
		if(value[0] != '')
			this.operation_cycle = value[0][0].operation_No;
		else
			this.operation_cycle = 1;
		console.log(`[${this.operation_cycle}]: operation cycle Completly loaded.`);

		sql = "SELECT * FROM panel";
		value = await DB.exec_sql(sql);
		console.log(`panel: ${value[0]}`);
		value[0].forEach((item,idx)=>{
			console.log(`\tpan: ${value[0][idx].furnace_ID}, ${value[0][idx].operation_No}`);
			this.furnace_operNum[value[0][idx].furnace_ID] = value[0][idx].operation_No;
		});
		this.furnace_operNum.forEach((item, idx)=>{
			console.log(`\tArr${idx}: ${item}`);
		});
	}

	async continues(fur_ID){
		if(this.furnace_operNum[fur_ID] == -1)
			return;

		var sql = `SELECT * FROM curr_fur${fur_ID}`;
		console.log(`\t\t${sql}`);
		var value = await DB.exec_sql(sql);
		
		console.log(JSON.stringify(value[0]));


		return JSON.stringify(value[0]);
	}

	async start(fur_ID, mat_ID, proc_ID, amount, feedback, span){
		if(this.furnace_operNum[fur_ID] != -1){
			console.log(`Furnace ${fur_ID} is already working`);
			return;
		}

		var sql = `INSERT INTO process_archive VALUES(0, ${fur_ID}, ${mat_ID}, ${proc_ID}, ${amount}, ${span}, ${feedback})`;
		DB.exec_sql_ins(sql);
		console.log('INSERTION to process_archive completed!');
			
		sql = `INSERT INTO panel VALUES(${fur_ID}, ${this.operation_cycle})`;
		await DB.exec_sql(sql);
		console.log(`Furnace${fur_ID} start with operation_No [${this.operation_cycle}]`);
		try{
			this.operation_cycle = this.operation_cycle + 1;
			this.furnace_operNum[fur_ID] = this.operation_cycle;
		} catch(err){
			console.log(err);
		}
	}


	async insert_values(fur_ID, t, press, flow, is_closed){
		if(this.furnace_operNum[fur_ID] == -1){
			console.log(`Furnace ${fur_ID} is not working`);
			return;
		}
		const sql = `INSERT INTO curr_fur${fur_ID} VALUES(0, ${timestamp.now()}, ${t[0]}, ${t[1]}, ${t[2]}, ${t[3]}, ${t[4]}, ${t[5]}, ${press}, ${flow}, ${is_closed})`
		//exec_sql_ins(sql);
		DB.exec_sql_ins(sql);
		console.log(`Furnace ${fur_ID} values inserted!`);
	}

	async terminate(fur_ID){
		var sql = `INSERT INTO archive_fur${fur_ID} SELECT * FROM (SELECT operation_No from panel where furnace_ID=${fur_ID}) as P join curr_fur${fur_ID}`;
		DB.exec_sql_ins(sql);
		
		sql = `TRUNCATE curr_fur${fur_ID}`;
		DB.exec_sql_ins(sql);

		sql = `DELETE FROM panel WHERE furnace_ID=${fur_ID}`;
		DB.exec_sql_ins(sql);
		this.furnace_operNum[fur_ID] = -1;
		console.log(`%%Furnace ${fur_ID} terminated.`);  
		console.log(`%%status is ${this.furnace_operNum[fur_ID]}`);
	}
}
/*

class Client{

	 init(fur_ID){
		var sql = `SELECT * FROM curr_fur${fur_ID}`
	}


	 clnt_curr(fur_ID){
		var sql = `SELECT * FROM curr_fur${fur_ID}`
	}


	 clnt_terminate(fur_ID){
		var sql = `INSERT INTO archive_fur${fur_ID} values()`
	}
}
*/
module.exports = new Furnaces();
//module.exports = new Client();
