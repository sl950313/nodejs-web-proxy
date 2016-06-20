/**
 *
 *
 * 这里是统一身份认证.
 * 默认认证成功.
 */
var sys = require('sys');
var getdata = require('./getdata.js');
var database = require('./database.js');

var databaseName = "UserInfo";
var TAG = "\nlogin.js\t";

function login(req, res) {
   response = {
      UserID:req.body.UserID,
      passwd:req.body.PassWd
   };
   console.log(TAG + "Got a get requiest from login");
   console.log(response);

   if (sysAuth(response)) {
      result = {
         page:'sys',
         UserID:response.UserID
      };
      res.end(JSON.stringify(result));
      //res.sendFile(__dirname + '/html/' + 'sys.html');
      return ;
   }
   if (stuAuth(response)) {
      /*
      res.writeHead(302, {
         'Location':'/html/stu.html'
      });
      */
      //res.redirect('/stu');
      //res.redirect('http://baidu.com');
      //res.end();
      result = {
         page:'stu',
         UserID:response.UserID
      };
      console.log(result);
      res.end(JSON.stringify(result));
      return ;
   }
   if (teacherAuth(response)) {
      result = {
         page:'stu',
         UserID:response.UserID
      };
      res.end(JSON.stringify(result));
      //res.sendFile(__dirname +'/html/' + 'teacher.html');
      return ;
   }

   if (response.UserID != "SA15011046") {
      response = "error login. Not SA15011046";
      res.end(JSON.stringify(response));
      return;
   }
   //getdata.getdata(req, res);
   //res.send('Hello World');
}

function stuAuth(response) {
   console.log(TAG + "stuAuth");
   /*
   if (response.UserID == "SA15011046") {
      console.log(TAG + 'auth OK!');
      return true;
   }
   */
   return true;
}

function teacherAuth(response) { 
   console.log(TAG + "teacherAuth");
   if (response.UserID == "BA15011046") {
      return true;
   }
   return false;
}

function sysAuth(response) { 
   console.log(TAG + "sysAuth");
   if (response.UserID == "SA14011046") {
      return true;
   }
   return false;
}
exports.login = login;
