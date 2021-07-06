import mariadb as mar
import sys

total_furnace_num = 3

try:
	conn = mar.connect(
		host = 		'localhost',
		user = 		'root',
		password = 	'1234',
		database = 	'cps',
	)
except mar.Error as e:
	print(f'Error connecting to MariaDB: {e}')
	sys.exit(1)

cur = conn.cursor()

query = 'DROP TABLE IF EXIST process_archive;
		DROP TABLE IF EXIST FUR1
		CREATE TABLE process_archive(
			operation_No 	int not null,
			furnace_ID 		int,
			material_ID 	int,
			process_ID 		int,
			amount 			int,
			feedback 		int,
			span 			int);
		'
cur.execute(query)


tmp = f'\nDROP TABLE IF EXIST fur{i}_archive;'
query = tmp * total_furnace_num
cur.execute(query[1:])

tmp = f'\nCREATE TABLE fur{}
