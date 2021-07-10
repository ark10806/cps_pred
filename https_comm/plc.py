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

	while True:
		temp = clnt.recv(SIZE).decode()
		print(f'from plt: {temp}')
		press = randint(1,100);
		
		data = {'temps': [{'temp': 1}, {'temp': 2}, {'temp': 3}, {'temp': 4}, {'temp': 5}, {'temp': 6}] , 'press': f'{press}'}
		res = requests.post(url, data=json.dumps(data), headers=headers, verify=False)
		print(res.status_code)
		time.sleep(1)
		
