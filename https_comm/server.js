const Furnaces = require('./service');
//Client = require('./service');

var express = require('express');
var bodyParser = require('body-parser');
var https = require('https')
var fs = require('fs');

var key = fs.readFileSync('/etc/ssl/private.key', 'utf8');
var cert = fs.readFileSync('/etc/ssl/certificate.crt', 'utf8');
var cred = {key: key, cert: cert};
var app = express();



const PORT = 8081;
console.log("server Starts");
//Furnaces.init();

var httpsServer = https.createServer(cred, app);

app.use(bodyParser.json())
app.post('/', function(req,res){
	Furnaces.init();
	var temp = req.body.temp;
	var press = req.body.press;
	console.log(req.body);

	return res.json({success:true, msg:"good"});
});

app.post('/start', function(req,res){
	const fur_ID = req.body.fur_ID;
	const mat_ID = req.body.mat_ID;
	const proc_ID = req.body.proc_ID;
	const amount = req.body.amount;
	const feedback = null;
	const span = req.body.span;
	Furnaces.start(fur_ID, mat_ID, proc_ID, amount, feedback, span);
	return res.json({success:true, msg:"fur started"});
});

app.post('/insert', function(req,res){
	let temps = []
	req.body.temps.forEach((item, idx)=>{
		temps.push(parseInt(item.temp));
	});
	const fur_ID = req.body.fur_ID;
	const press = req.body.press;
	const flow = req.body.flow;
	const is_closed = req.body.is_closed;
	Furnaces.insert_values(fur_ID, temps, press, flow, is_closed);
	return res.json({success:true, msg:"fur inserted"});

});

app.post('/init', function(req,res){
	const fur_ID = req.body.fur_ID;
});

app.post('/current', function(req,res){
	const fur_ID = req.body.fur_ID;
});

app.post('/end_process', function(req,res){
	const fur_ID = req.body.fur_ID;
});
httpsServer.listen(PORT, function(){
	console.log('listening...');
});
