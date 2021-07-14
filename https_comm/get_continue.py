import requests
import json
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

url = 'https://www.pred.ga:8081'
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

req_json = {'fur_ID': 1}
res = requests.get(url + '/continues', data=json.dumps(req_json), headers=headers, verify=False)
print(res)
print(res.json())
