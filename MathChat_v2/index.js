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

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

io.sockets.on('connection', function (socket) {
    // socket.emit('server_message', { message: sess.name + ' entered the chatroom.' });
    // socket.on('disconnect', function() {
    // 	socket.emit('server_message', { message: sess.name + ' left the chatroom.' });
    // });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
    socket.on('new_user', function () {
        io.sockets.emit('send_sess', sess);
    });
    socket.on('enter', function() {
        io.sockets.emit('server_message', { message: sess.name + ' entered the chatroom.'});
    });
    // socket.on('exit', function (data) {
    //     io.sockets.emit('server_message', { message: data.name + ' left the chatroom.' });
    // });
    // socket.on('typing', function() {
    //     io.sockets.emit('typing_msg');
    // });
});

app.get('/logout', function(req, res) {
    io.sockets.on('connection', function (socket) {
        socket.on('exit', function () {
            io.sockets.emit('server_message', { message: sess.name + ' left the chatroom.'});
        });
    });

    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.use(express.static(__dirname + '/public'));
