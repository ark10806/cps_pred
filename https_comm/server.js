var express = require('express');
var bodyParser = require('body-parser');
var https = require('https')
var fs = require('fs');

var key = fs.readFileSync('/etc/ssl/private.key', 'utf8');
var cert = fs.readFileSync('/etc/ssl/certificate.crt', 'utf8');
var cred = {key: key, cert: cert};
var app = express();
const PORT = 8081;

var httpsServer = https.createServer(cred, app);

app.use(bodyParser.json())
app.post('/', function(req,res){
	var msg = req.body.my_msg;
	console.log(msg);
	return res.json({success:true, msg:"good"});
});



httpsServer.listen(PORT, function(){
	console.log('listening...');
});
