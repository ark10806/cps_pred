import pymysql as mar
import sys

total_furnace = 8

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

query = 'DROP TABLE IF EXISTS process_archive'
cur.execute(query)

query = 'CREATE TABLE process_archive(operation_No int not null auto_increment PRIMARY KEY, furnace_ID int, material_ID int, process_ID int, amount int, feedback int, span int)'
cur.execute(query)



query = 'DROP TABLE IF EXISTS archive_fur%s'
for i in range(total_furnace):
	cur.execute(query, i+1)

query = 'CREATE TABLE archive_fur%s(operation_No int not null, relative_time int not null, timestamp int not null, temp1 int(4) not null, temp2 int(4) not null, temp3 int(4) not null, temp4 int(4) not null, temp5 int(4) not null, temp6 int(4) not null, press int(4) not null, flow int(4) not null, is_closed boolean not null, PRIMARY KEY(operation_No, relative_time))'
for i in range(total_furnace):
	cur.execute(query, i+1)


query = 'DROP TABLE IF EXISTS panel'
cur.execute(query)
query = 'CREATE TABLE panel(furnace_ID int not null primary key,operation_No int not null)'
cur.execute(query)


query = 'DROP TABLE IF EXISTS curr_fur%s'
for i in range(total_furnace):
	cur.execute(query, i+1)
query = 'CREATE TABLE curr_fur%s(relative_time INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY, timestamp INT NOT NULL, temp1 INT(4) NOT NULL, temp2 INT(4) NOT NULL, temp3 INT(4) NOT NULL, temp4 INT(4) NOT NULL, temp5 INT(4) NOT NULL, temp6 INT(4) NOT NULL, press INT(4) NOT NULL, flow INT(4) NOT NULL, is_closed BOOLEAN NOT NULL)'
for i in range(total_furnace):
	cur.execute(query, i+1)
