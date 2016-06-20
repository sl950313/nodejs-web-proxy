/**
 *这里是路由.
 *
 */

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var search = require('./search.js')
var login = require('./login.js')
var getdata = require('./getdata.js')

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


app.post('/login', login.login);
app.post('/getdata', getdata.getdata);
app.post('/search', search.search);
app.post('/search_rlt', search.search_rlt);


app.get('/index.html', function(req, res) {
   console.log("jump to index.html");
   //res.redirect('/login.html');
   console.log("__dirname= " + __dirname);
   res.sendFile(__dirname + '/' + 'login2.html');
   //res.sendFile('/login.html', {root:__dirname});
});

var server = app.listen(10002, function() {
   var host = server.address().address;
   var port = server.address().port;
   console.log("app listening at http://%s:%s", host, port);
});

