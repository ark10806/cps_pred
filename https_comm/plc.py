import socket as sock
import requests
import json
import time

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
		
		data = {'my_msg': f'{temp}'}
		res = requests.post(url, data=json.dumps(data), headers=headers, verify=False)
		print(res.status_code)
		
