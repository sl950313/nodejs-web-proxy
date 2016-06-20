/**
 * 这里对数据库的操作进行了封装.
 * author@shilei
 */
var sys = require('sys');
var mysql = require('mysql');

var TAG = "\ndatabase.js\t";

// 新建数据库

// 连接数据库
function connectDatabase(databasename, callback) {
   var client = mysql.createConnection({
      user:'root',
      password:'openstack210',
   });
   client.connect(function(err, results) {
      if (err) {
         console.log(TAG + 'connect error' + err.message);
         return -1;
      }
      console.log(TAG + 'Connect to the db');
      client.query('Use ' + databasename, function(err, results) {
         if (err) {
            console.log(TAG + 'use' + databasename + 'error' + err.message);
            client.end();
            return -1;
         }
         console.log(TAG + 'Use ' + databasename + ' Success');
         callback(client);
         //return client;
      });
   });
}


// 插入数据.
function insertData(client, value, callback) { 
   console.log("start\n");
   query = 'INSERT INTO STU_INFO VALUE(?,?,?,?,?)';
   for (var i = 7; i < 7000; i++) {
      if (i % 10000 == 0) {
         console.log("here\n" + i);
      }
      var k = i + 15011000;
      var UserID = 'SA' + k;
      //console.log("UserID = " + UserID);
      for (var j = 0; j < 400; j++) {
         query_param = [UserID, '127.11110000', '37.11110000', 123456789, 'I\'m in school'];
         client.query(query, query_param, function(err, results){
            if (err) {
               console.log(TAG + "insert error" + err.message);
               return ;
            }
            //console.log(TAG + 'insert succes');
            //callback(client);
         });
      }
   }
   console.log("finish\n");
}

// 读取数据.
function getAllDataByUserID(client, UserID, callback) {
   query = 'select * from STU_INFO where UserID=' + UserID + ';';
   client.query(query, function(err, results) {
      if (err) {
         console.log(TAG + 'getData error' + err.message);
         return ;
      }
      console.log(TAG + 'getData success');
      callback(results);
   });
   //client.q
}

/*
 * get user data by one day.
 */
function getDataByUserIDAndDate(client, UserID, dateBegin, dateEnd, callback) {
   query = 'select * from STU_INFO where UserID="' + UserID + '"'+ ' and UnixTime>=' + dateBegin + ' and UnixTime<=' + dateEnd + ';';
   console.log(TAG + "query = " + query);
   client.query(query, function(err, results) {
      if (err) {
         console.log(TAG + 'getDataByUserIDAndDate ' + err.message);
         return ;
      }
      console.log(TAG + 'getDataByUserIDAndDate success');
      callback(results);
   });
}

exports.connectDatabase = connectDatabase;
exports.insertData = insertData;
exports.getDataByUserIDAndDate = getDataByUserIDAndDate;
