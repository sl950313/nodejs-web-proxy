#ifndef OPMYSQL_H
#define OPMYSQL_H
#include "mysql.h"
#include <string>

using namespace std;

class OpMysql {
   private MYSQL sql;

   public OpMysql();
   public ~OpMysql();

   public bool connectSql(string remoteIp, string username, string passwd, string tableName, string port);
   public bool writeData();
   public bool readDate();
   public bool closeSql();
};

#endif // OPMYSQL_H
