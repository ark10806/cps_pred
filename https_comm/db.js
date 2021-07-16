var mysql = require('mysql2/promise');

const pool = mysql.createPool({
	host:		'localhost',
	user:		'root',
	password:	'1234',
	database:	'cps'
});

class DB{
	async exec_sql(sql){
		var conn;
		try{
			conn = await pool.getConnection(async conn => conn);
			try{
				const rows = await conn.query(sql);
				return rows;
			} catch(err) {
				console.log(`\t////////////${sql}`);
				console.log("\tQuery Error!");
				console.log(err);
				return null;
			}
		} catch(err) {
			console.log("\tDB Connection Error");
			return null;
		} finally{
			conn.release();
		}
	}

	async exec_sql_ins(sql){
		var conn;
		try{
			conn = await pool.getConnection(async conn => conn);
			try{
				conn.query(sql);
				console.log("inserted!");
			} catch(err){
				console.log(err);
			}
		} catch(err){
			console.log("\tDB Connection Error");
		} finally{
			conn.release();
		}
	}
}

module.exports = new DB();

/*
const exec_sql = async(sql)=>{
	var conn;
	try{
		conn = await pool.getConnection(async conn => conn);
		try{
			const rows = await conn.query(sql);
			return rows;
		} catch(err) {
			console.log("\tQuery Error!");
			console.log(err);
			return null;
		}
	} catch(err) {
		console.log("\tDB Connection Error");
		return null;
	} finally{
		conn.release();
	}
}
const exec_sql_ins = async(sql)=>{
	var conn;
	try{
		conn = await pool.getConnection(async conn => conn);
		try{
			conn.query(sql);
			console.log("inserted!");
		} catch(err){
			console.log(err);
		}
	} catch(err){
		console.log("\tDB Connection Error");
	} finally{
		conn.release();
	}
}
module.exports = exec_sql;
module.exports = exec_sql_ins;

*/
