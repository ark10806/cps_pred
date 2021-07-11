import socket as sock
import requests
import json
import time
from random import randint

#plc
HOST = '165.246.44.130'
PORT = 1000
SIZE = 10

#pred.ga
url = 'https://www.pred.ga:8081'
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

with sock.socket(sock.AF_INET, sock.SOCK_STREAM) as clnt:
	clnt.connect((HOST, PORT))

	fur_ID = 1
	temp = clnt.recv(SIZE).decode()
	print(f'from plt: {temp}')
	press = randint(1,100);

	#data = {'temps': [{'temp': 1}, {'temp': 2}, {'temp': 3}, {'temp': 4}, {'temp': 5}, {'temp': 6}] , 'press': f'{press}'}

	res = requests.post(url, verify=False)
	print(f'init: {res.status_code}')
	

	time.sleep(5)
	data = {'fur_ID': 7, 'mat_ID': 0, 'proc_ID': 0, 'amount': 100, 'feedback': 'null', 'span': '100'}
	res = requests.post(url+'/start', data=json.dumps(data), headers=headers, verify=False)
	print(res.status_code)
	#time.sleep(5)
	'''
	while True:
		data = {'fur_ID': 1, 'temps': [{'temp': 1}, {'temp': 2}, {'temp': 3}, {'temp': 4}, {'temp': 5}, {'temp': 6}] , 'press': f'{press}', 'flow': 0, 'is_closed': 'true'}
		res = requests.post(url+'/insert', data=json.dumps(data), headers=headers, verify=False)
		print(f'insert: {res.status_code}')
		time.sleep(1)

	'''
'''
	while True:
		temp = clnt.recv(SIZE).decode()
		print(f'from plt: {temp}')
		press = randint(1,100);
		
		data = {'temps': [{'temp': 1}, {'temp': 2}, {'temp': 3}, {'temp': 4}, {'temp': 5}, {'temp': 6}] , 'press': f'{press}'}
		res = requests.post(url, data=json.dumps(data), headers=headers, verify=True)
		print(res.status_code)
		time.sleep(5)
'''


