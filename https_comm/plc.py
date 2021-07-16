import socket as sock
import requests
import json
import time
from random import randint
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

HOST = '165.246.44.130'
PORT = 1000
plc0 = (HOST, PORT)
SIZE = 10
tot_fur_num = 8

url = 'https://www.pred.ga:8081'
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

class Furnace:
	def __init__(self, fur_ID, plc_addr=None):
		self.fur_ID = fur_ID+1
		self.plc_addr = plc_addr
		self.plc_data_size = 10
		self.url = 'https://www.pred.ga:8081'
		self.headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
	
	def parser(self, raw_data: str) -> list:
		# protocol이 해당 업체측에서 정의 되면 파싱 가능.
		data = []
		'''
		I wrote temporary format down below.
		[temp1, temp2, temp3, temp4, temp5, temp6, pressure, flow, is_closed]
		'''

		data = []
		for _ in range(6):
			data.append(randint(90,100))
		for _ in range(2):
			data.append(randint(30,50))
		data.append(True)
		return data



	def get_values(self):
		with sock.socket(sock.AF_INET, sock.SOCK_STREAM) as clnt:
			clnt.connect(self.plc_addr)
			data = clnt.recv(self.plc_data_size).decode()
			
		data = self.parser(data)
		return data

	def post(self, post_fix: str, req_json: dict):
		res = requests.post(url+post_fix, data=json.dumps(req_json), headers=self.headers, verify=False)
		return res

	def start(self, mat_ID=0, proc_ID=0, amount=0, span=0, feedback=None):
		req_json = {'fur_ID': self.fur_ID, 'mat_ID': mat_ID, 'proc_ID': proc_ID, 'amount': amount, 'span': span, 'feedback': 'null'}
		res = self.post('/start', req_json)
		print(f'start_furnace: {res.status_code}')

	def insert(self):
		values = self.get_values()

		req_json = {'fur_ID': self.fur_ID, 'is_closed': values[8], 'temps': [{'temp': values[0]}, {'temp': values[1]}, {'temp': values[2]}, {'temp': values[3]}, {'temp': values[4]}, {'temp': values[5]}], 'flow': values[7], 'press': values[6]}
		res = self.post('/insert', req_json)
		print(f'insert_furnace: {res.status_code}')

	def terminate(self):
		#plc_data = get_sensor(plc_addr)
		req_json = {'fur_ID': self.fur_ID}
		res = self.post('/terminate', req_json)
		print(f'terminate_furnace: {res.status_code}')
	

panel = [1,1,1,1,1,1,1,1]
furs = []
for i in range(tot_fur_num):
	furs.append(Furnace(i, plc0))
	if (panel[i]):
		furs[i].start()
		time.sleep(0.5)

while True:
	if sum(panel) == 0:
		break
	for i in range(tot_fur_num):
		if(panel[i]):
			furs[i].insert()
			'''
			if(randint(1,10) == 5):
				if(i != 2):
					furs[i].terminate()
					panel[i] = 0
			'''
			time.sleep(0.1)
	


