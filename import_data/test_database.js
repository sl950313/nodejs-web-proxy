
var sys = require('sys')
var database = require('../database.js');
var fs = require('fs');

var TAG = "\ninsert_data.js";
var databasename = "TEST";

database.connectDatabase("TEST", function(client) {
   console.log("start");
   query = "SELECT * from STU_INFO where USERID='SA15011046';";
   client.query(query, function(err, results) {
      if (err) {
         console.log("LOOKUP ERROR");
      }
      console.log("results success");
      client.end();
      return ;
   });
});

