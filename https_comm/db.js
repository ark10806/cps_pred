var maria = require('mariadb');
const pool = maria.createPool({

	//host:		'165.246.44.142:3306',
	host:		'165.246.44.142',
	port:		3306,
	user:		'plc',
	password:	'1234',
	//database:	'tmp_plc'
});

async function getUserList() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query('USE mysql'); // 사용할 DB 명시
    rows = await conn.query('SELECT * FROM users'); // 쿼리 실행
  }
  catch (err) { throw err; }
  finally {
    if (conn) conn.end();
    return rows;
  }
}

