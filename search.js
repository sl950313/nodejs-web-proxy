/**
 * 提供查找功能.
 * author@shilei
 */
var sys = require('sys');
var http = require('http');
var database = require('./database.js');

var databaseName = "STU_INFO";
var TAG = "\nsearch.js\t";
var serverName = ["114.214.169.173"];
function search(req, res) {

   console.log(TAG + " here ");
   var data = {
      UserID:req.body.UserID,
      date:req.body._Date
   };
   console.log(data);
   //data = JSON.stringify(data);
   /*
   data = require('querystring').stringify(data);
   var opt = {
      method: "POST",  
      host: "localhost",
      port: 8082,  
      path: "/chat/search",  
      headers: {  
         "Content-Type": 'application/x-www-form-urlencoded',
         "Content-Length": data.length  
      }  
   };
   var body = '';
   var request = http.request(opt, function(_res) {
       console.log("Got response: " + _res.statusCode);
       _res.on('data',function(d){
               body += d;
           }).on('end', function(){
                   console.log(_res.headers);
                   console.log("body: " + body); 
                   var results = analysis(body);
                   console.log("in here results = " + results[0]['LOCATION']);
                   res.end(JSON.stringify(results));
               });
   }).on('error', function(e) {
       console.log("Got error: " + e.message);
   });

   request.on('error', function(e) {
      console.log("problem with request: ${e.message}");
   });

   console.log(data);
   request.write(data + "\n");
   request.end();
   */

   
      console.log(TAG + "Got a search ");
      var date = resolve(req.body._Date);
      database.connectDatabase(databaseName, function(client) {
      database.getDataByUserIDAndDate(client, req.body.UserID, date.beginTime, date.endTime, function(results) { 
      console.log(TAG + "results.length = " + results.length);
      for (var i = 0; i < results.length; ++i) {  
      console.log(results[i]['USERID']);
      console.log(results[i]['LATITUDE']);     
      console.log(results[i]['LONGITUDE']);    
      console.log(results[i]['UNIXTIME']);
      console.log(results[i]['UNIXTIME_END']);
      console.log(results[i]['LOCATION']);         
      console.log(results[i]['LOCATION_DETAIL']);         
      console.log(results[i]['_FROM']);         
      }
      res.end(JSON.stringify(results));
      client.end();
      });
      });
}

function search_rlt(req, res) {
   console.log(TAG + "Got a search_rlt ");
   response = {
      UserID:req.body.UserID,
      dateBegin:req.body.dateBegin,
      dateEnd:req.body.dateEnd
   };
   var date1 = resolve(response.dateBegin);
   var date2 = resolve(response.dateEnd);
   var dataSend = new Array();
   database.connectDatabase(databaseName, function(client) {
      database.getDataByUserIDAndDate(client, response.UserID, date1.beginTime, date2.endTime, function(results) {
         // Location
         for (var i = 0; i < results.length; ++i) {
            var point = {};
            point["lat"] = results[i].LATITUDE;
            point["lng"] = results[i].LONGITUDE;
            point["count"] = 1;

            var j = 0;
            for ( j = 0; j < dataSend.length; ++j) {
               if (point['lat'] == dataSend[j]['lat'] && point['lng'] == dataSend[j]['lng']) {
                  dataSend[j]['count']++;
                  break;
               }
            }
            if (j == dataSend.length) {
               dataSend[dataSend.length] = point;
            }
         }
         res.end(JSON.stringify(dataSend));
         client.end();
         console.log(dataSend);
      });
   });
}

function analysis(body) {
   var results = [];
   var tmp;
   var cur = 0;
   for (var i = 0; i < body.length; ++i) {
      if (body[i] == '}') {
         tmp = body.substr(cur, i - cur + 1);
         console.log("tmp = " + tmp);
         results[results.length] = JSON.parse(tmp);
         console.log("results = " + results['LOCATION']);
         cur = i + 1;
      }
   }
   return results;
}

function resolve(_Date) {
   var date = {
      beginTime: 0,
      endTime: 0
   };
   date.beginTime = (new Date(_Date + " 00:00:00")).getTime()/ 1000;  
   date.endTime = (new Date(_Date + " 23:59:59")).getTime()/ 1000;  
   return date; 
}

exports.search = search;
exports.search_rlt = search_rlt;
