/**
 *
 * 这里是数据读取.
 */
var sys = require('sys');
var Client = require('mysql');

var TAG = "\ngetdata.js\t";
var databaseName = "TEST";
/*
31.8430170000,117.2753660000
31.8440170000,117.2753660000
31.8450270000,117.2659870000
31.8455330000,117.2640020000
*/

function getdata(req, res){
   console.log("in getdata.\n");
   console.log("UserID = " + req.body.UserID);
   console.log("passwd = " + req.body.passwd);
   //search(req, res);
   console.log("in search" + TAG);

   // 连接数据库.
   var client = Client.createConnection({
      user:'root',
      password:'openstack210',
   });
   var UserID = req.body.UserID;

   client.connect(function(err, results) {
      if (err) {
         console.log('Connection error:' + err.message);
         return;
      }
      console.log('Connect to the db');
      client.query('Use ' + databaseName, function() {
         if (err) {
            console.log(TAG + 'can not use TEST database.' + err.message);
            client.end();
            return ;
         }
         // 查找数据并返回.
         console.log(TAG + "Use TEST success\n");
         //var Time = 123456789;
         client.query('SELECT * from STU_INFO where UserID=\'' + UserID + '\'', function(err, results, fields) {
            console.log(TAG + "here");
            if (err) {
               console.log(TAG + 'search error' + err.message + '\n');
               client.end();
               return ;
            }
            console.log(TAG + "results.length = " + results.length);
            for (var i = 0; i < results.length; ++i) {
               console.log(results[i]['UserID']);
               console.log(results[i]['Latitude']);
               console.log(results[i]['Longitude']);
               console.log(results[i]['Time']);
               console.log(results[i]['Info']);
            }
            // ...TODO
            res.writeHead(200, {'Content-Type': 'application/json'}); 
            res.end(JSON.stringify(results));
         });
      });
   });
}


exports.getdata = getdata;
