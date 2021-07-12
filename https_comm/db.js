var mysql = require('mysql2/promise');

const pool = mysql.createPool({
	host:		'localhost',
	user:		'root',
	password:	'1234',
	database:	'cps'
});
	
const exec_sql = async(sql)=>{
	console.log("sql start!");
	var conn;
	try{
		conn = await pool.getConnection(async conn => conn);
		try{
			const rows = await conn.query(sql);
			//console.log(rows);
			//const [rows] = await conn.query(sql);
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

module.exports = exec_sql;
