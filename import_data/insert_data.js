var sys = require('sys')
var database = require('../database.js');
var fs = require('fs');

var TAG = "\ninsert_data.js";
var databasename = "TEST";

var data = fs.readFileSync('./user_location');
//console.log("同步读取: \n" + data.toString());
console.log("程序执行完毕。");
var dataStr = data.toString();

console.log(data.length);
var begin = 0;
var data2 = new Array();
var databaseStr = ["UserID", "UnixTime", "UnixTimeEnd", 
"Location", "LocationDetail", "Latitude", "Longitude", "From"];
for (var i = 0; i < dataStr.length; ++i) {
   if (dataStr[i] == '\n') {
      var str = dataStr.substr(begin, i - begin + 1);
      //console.log(str);
      var args = str.split("\t");
      var dataTmp = {};
      for (var j = 0; j < databaseStr.length; ++j) {
         dataTmp[databaseStr[j]] = args[j];
      }
      data2[data2.length] = dataTmp;
      begin = i + 1;
   }
}


_parse = function(data) {
   // .. TODO
   var str = data.substr(0, 2);
   if (str == "SA") {
      return parseInt("11" + data.substr(2, data.length - 2));
   }
   if (str == "BA") {
      return parseInt("12" + data.substr(2, data.length - 2));
   }
}

console.log(data2.length);
console.log("data2[0] = " + data2[0]);
console.log("data2[0]['UserID'] = " + data2[0]['UserID']);
console.log("data2[0]['Latitude'] = " + data2[0]['Latitude']);
console.log("data2[0]['Longitude'] = " + data2[0]['Longitude']);
console.log("data2[0]['UnixTime'] = " + data2[0]['UnixTime']);
console.log("data2[0]['Location'] = " + data2[0]['Location']);

console.log("data2[1]['UserID'] = " + data2[1]['UserID']);
console.log("data2[1]['Latitude'] = " + data2[1]['Latitude']);
console.log("data2[1]['Longitude'] = " + data2[1]['Longitude']);
console.log("data2[1]['UnixTime'] = " + data2[1]['UnixTime']);
console.log("data2[1]['Location'] = " + data2[1]['Location']);

/*
var map = {};
var convP = fs.readFileSync('test_data_open');
console.log("同步读取: \n" + convP.toString());
console.log("程序执行完毕。");
var convPStr = convP.toString();
var begin2 = 0;
for (var i = 0; i < convPStr.length; ++i) {
   if (convPStr[i] == '\n') {
      var str = convPStr.substr(begin2, i - begin2 + 1);
      //console.log("str = " + str);
      //console.log("begin2 = " + begin2);
      var twoPoint = str.split("\t");
      var pointOrig = twoPoint[0];
      var pointBaidu = twoPoint[1];
      //console.log(pointOrig);
      //console.log(pointBaidu);
      var tmp_orig = {};
      var tmp_baidu = {};
      tmp_orig['LONGITUDE'] = pointOrig.split(",")[0];
      tmp_orig['LATITUDE'] = pointOrig.split(",")[1];
      tmp_baidu['LONGITUDE'] = pointBaidu.split(",")[0];
      tmp_baidu['LATITUDE'] = pointBaidu.split(",")[1];
      map[tmp_orig] = tmp_baidu;
      begin2 = i + 1;
   }
}
console.log(map);
*/


database.connectDatabase("TEST", function(client) {
   console.log("start\n");
   query = "INSERT INTO STU_INFO VALUE(?,?,?,?,?,?,?,?,?)";
   for (var i = 0; i < data2.length; ++i) {
      query_param = [_parse(data2[i]['UserID'], 16), data2[i]['UserID'], Number(data2[i]['Longitude']), Number(data2[i]['Latitude']), Number(data2[i]['UnixTime']), Number(data2[i]['UnixTimeEnd']), data2[i]['Location'], data2[i]['LocationDetail'], data2[i]['From']]; 
      client.query(query, query_param, function(err, results) {
         if (err) {
            console.log("insert error!" + err.message);
            return ;
         }
      });
   }
});

