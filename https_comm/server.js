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

/*
다수의 클라이언트를 활용할 경우 문제 발생!@!!!!!]1
operation_cycle 동기화되지 않음.
*/


const PORT = 8081;
console.log("server Starts");
Furnaces.init();

var httpsServer = https.createServer(cred, app);

app.use(bodyParser.json())
/*
app.post('/', function(req,res){
	Furnaces.init();	

	return res.json({success:true, msg:"good"});
});
*/
app.get('/continues', async  function(req,res){
	console.log(`\t<CONTINUE FURNACE${req.body.fur_ID}>`);
	const fur_ID = req.body.fur_ID;
	const value = await Furnaces.continues(fur_ID);
	//return res.json({success:true, msg:'continuing'});
	console.log(`\tfinal: ${value}`);
	//client에 보낼 값 최적화 할 것.
	return res.send(value);
	//return res.json({success:true, values: value});
});

app.get('/current', async function(req,res){
	console.log(`\t<CURRENT FURNACE${req.body.fur_ID}>`);
	const fur_ID = req.body.fur_ID;
	const value = await Furnaces.get_current(fur_ID);
	console.log(`final: ${value}`);
	return res.send(value);
});

app.post('/start', function(req,res){
	console.log(`\t<STARTING FURNACE${req.body.fur_ID}>`);
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

app.post('/terminate', function(req,res){
	console.log(`\t<TERMINATE FURNACE${req.body.fur_ID}>`);
	const fur_ID = req.body.fur_ID;
	Furnaces.terminate(fur_ID);
	return res.json({success:true, msg:`fur${fur_ID} terminated`});
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
