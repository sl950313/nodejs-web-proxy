var sys =require('sys')
var database = require('../database.js');
var fs = require('fs');

var TAG = "\ninsert_data.js";
var databasename = "TEST";
var USERNUM = 100;
var LISTNUM = 1000;

database.connectDatabase(databasename, function(client) {
   console.log("start\n");
   query = "INSERT INTO STU_INFO VALUE(?,?,?,?,?,?,?,?,?)";
   for (var i = 0; i < USERNUM; i++) {
      UserID = "SA" + i;
      if (i % 5 == 0) {
         console.log("i = " + i);
      }
      for (var j = 0; j < LISTNUM; j++) {
         query_param = [1115011046, UserID, 117.1234567890, 37.1234567890, 1234567890 + j, 9876543210 + j, "实验室", "lab210", "create"];
         client.query(query, query_param, function(err, results) {
            if (err) {
               console.log("insert error!" + err.message);
               return ;
            }
         });
      }
   }
   client.end();
   console.log("end");
});
