var exec_sql_init = require('./db');

var Furnaces = ('./service');
var PLC = require('./service');
var Client = require('./service');

var express = require('express');
var bodyParser = require('body-parser');
var https = require('https')
var fs = require('fs');

var key = fs.readFileSync('/etc/ssl/private.key', 'utf8');
var cert = fs.readFileSync('/etc/ssl/certificate.crt', 'utf8');
var cred = {key: key, cert: cert};
var app = express();

const PORT = 8081;

Furnaces.init();

var httpsServer = https.createServer(cred, app);

app.use(bodyParser.json())
app.post('/', function(req,res){
	var temp = req.body.temp;
	var press = req.body.press;
	console.log(req.body);
	exec_sql_init(temp, press);	

	return res.json({success:true, msg:"good"});
});

app.post('/insert', function(req,res){
	let temps = []
	req.body.temps.forEach((item, idx)=>{
		temps.push(parseInt(item.temp));
	});
	const fur_ID = req.body.fur_ID;
	const temp = req.body.temp;
	const press = req.body.press;
	Furnaces.start(fur_ID, mat_ID, proc_ID, amount, feedback, span);
	Furnaces.insert_values(fur_ID, temps, press, flow, is_closed);

});

app.post('/init', function(req,res){
	const fur_ID = req.body.fur_ID;
	exec_sql_init(fur_ID);
});

app.post('/current', function(req,res){
	const fur_ID = req.body.fur_ID;
	exec_sql_curr(fur_ID);
});

app.post('/end_process', function(req,res){
	const fur_ID = req.body.fur_ID;
	exec_sql_terminate(fur_ID);
});

httpsServer.listen(PORT, function(){
	console.log('listening...');
});
