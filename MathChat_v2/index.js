var express = require("express");
var jade = require("jade");
var session = require("express-session");
var bodyParser = require("body-parser");
// var cookieParser = require("cookie-parser")();
// var session = require("cookie-session")({secret: 'secret'});
var app = express();
var port = 3700;
 
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.use(session({secret: 'secret'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;

app.get("/", function(req, res){
	sess=req.session;
    res.render("page");
});

app.post('/login',function(req,res){
	sess=req.session;
	//In this we are assigning email to sess.name variable.
	//name comes from HTML page.
	sess.name=req.body.name;
    console.log(req);
	res.end('done');
});

app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('disconnect', function() {
    	socket.emit('message', { message: 'user left' });
    });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
    socket.on('new_user', function () {
        io.sockets.emit('send_sess', sess);
    });
});
