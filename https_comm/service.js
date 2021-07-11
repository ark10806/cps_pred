const exec_sql = require('./db');
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
		for(var i=0; i<total_furnaces; i++)
			this.furnace_operNum.push(-1); 		//async DB.operation No로부터 받아와.
	}

	async init(){ 
		console.log("Getting an operation cycle from DB..");
		const sql = `SELECT operation_No FROM process_archive order by operation_No desc limit 1`;
		exec_sql(sql).then((value) => {
			console.log(`asdfasdfasdf-${value[0]}-`);
			if(value[0] != '')
				this.operation_cycle = value[0][0].operation_No;
			else
				this.operation_cycle = 0;
			//다른 Block 안에서의 this 사용은 문제가 될 수 있다. check!
			console.log(`[${this.operation_cycle}]: operation cycle Completly loaded.`);
		});

		const sql2 = "SELECT * FROM panel";
		exec_sql(sql2).then((value) => {
			console.log(`panel: ${value[0]}`);
			value[0].forEach((item,idx)=>{
				console.log(`\tpan: ${value[0][idx].furnace_ID}, ${value[0][idx].operation_No}`);
				this.furnace_operNum[value[0][idx].furnace_ID] = value[0][idx].operation_No;
			});
			this.furnace_operNum.forEach((item, idx)=>{
				console.log(`\tArr: ${item}`);
			});
		});
	}
	async start(fur_ID, mat_ID, proc_ID, amount, feedback, span){
		if(this.furnace_operNum[fur_ID] != -1){
			console.log(`Furnace ${fur_ID} is already working`);
			return;
		}

		const sql = `INSERT INTO process_archive VALUES(0, ${fur_ID}, ${mat_ID}, ${proc_ID}, ${amount}, ${feedback}, ${span})`;
		exec_sql(sql).then((value) => {
			console.log('INSERTION to process_archive completed!');
			const sql2 = `INSERT INTO panel VALUES(${fur_ID}, ${this.operation_cycle})`;
			exec_sql(sql2).then((value) => {
				try{
					this.operation_cycle = this.operation_cycle + 1;
					this.furnaceStatus[fur_ID] = this.operation_cycle;

				}catch(err){
					console.log(`++err: ${err}`);
				}
				console.log(`Ready to insert operation_cycle ${this.operation_cycle}`);
				console.log(`Furnace start with operation_No [${this.operation_cycle}]`);
			});

		});
		/*
		const sql2 = `INSERT INTO panel VALUES(${fur_ID}, ${this.operation_cycle})`;
		exec_sql(sql2).then((value) => {
			this.furnaceStatus[fur_ID] = ++this.operation_cycle;
			console.log(`Ready to insert operation_cycle ${this.operation_cycle}`);
			console.log(`Furnace start with operation_No [${this.operation_cycle}]`);
		});
		*/
	}
	async insert_values(fur_ID, t, press, flow, is_closed){
		if(this.furnaceStatus[fur_ID] == -1){
			console.log(`Furnace ${fur_ID} is not working`);
			return;
		}
		const sql = `INSERT INTO curr_fur${fur_ID} VALUES(0, ${timestamp.now()/1000}, ${t[0]}, ${t[1]}, ${t[2]}, ${t[3]}, ${t[4]}, ${t[5]}, ${press}, ${flow}, ${is_closed})`
		exec_sql(sql).then((value) => {
			console.log(`Furnace ${fur_ID} values inserted!`);
		});
	}

	async terminate(fur_ID){
		this.furnace_operNum[fur_ID] = -1;
		sql = `DELETE FROM process_archive WHERE operation_No=${this.furnace_operNum[fur_ID]}`;
		exec_sql(sql).then((value) => {
			this.furnace_operNum[fur_ID] = -1;
			console.log(`Furnace ${fur_ID} terminated.`);  
			console.log(`status is ${this.furnace_operNum[fur_ID]}`);
		});
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
