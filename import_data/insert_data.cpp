#include <iostream>
#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "mysql.h"

using namespace std;

MYSQL mysql;
int mode = 0;
char *filename = NULL;
char *tablename = NULL;

int openFileWriteToDatabase() {
   FILE *fp = fopen(filename, "r");
   if (!fp) {
      printf("error open file %s\n", filename);
      return -1;
   }
   char str_one_line[256];
   char *p;
   char data[8][32];
   int i;
   mysql_query(&mysql, "set names utf8");
   mysql_query(&mysql,"START TRANSACTION");
   while (!feof(fp)) {
      p = NULL;
      i = 0;
      memset(data, 0, 8 *32);
      memset(str_one_line, 0, 256);
      fgets(str_one_line, 256, fp);
      if (strlen(str_one_line) == 0) {
         break;
      }
      p = strtok(str_one_line, "\t");
      while (p) {
         strcpy(data[i], p);
         i++;
         p = strtok(NULL, "\t");
      }
      char *tmp =  strchr(data[7], '\r');
      if (tmp) *tmp = 0;
      //data[7][strlen(data[7]) - 2] = 0;
      char sql[256];
      memset(sql, 0, 256);
      sprintf(sql, "insert into STU_INFO values('%s', %ld, %ld, '%s', '%s', %lf, %lf, '%s');", data[0], atol(data[1]), atol(data[2]), data[3], data[4], atof(data[5]), atof(data[6]), data[7]);
      //printf("sql = %s\n", sql);
      mysql_query(&mysql, sql);
   }
   mysql_query(&mysql,"COMMIT");
   return 0;
}

int truncateTable() {
   char sql[64];
   memset(sql, 0, 64);
   sprintf(sql, "truncate table STU_INFO");
   mysql_query(&mysql, sql);
   return 0;
}

void initSql() {
   mysql_init(&mysql);
   if (NULL == mysql_real_connect(&mysql, "localhost", "root", "openstack210", "STU_INFO", 3306, NULL, 0)) {
      int i = mysql_errno(&mysql);
      string strError= mysql_error(&mysql);
      cout <<"Error info: "<<strError<<endl;
      printf("Error;");
      exit(-1);
   }
}
void closeSql() {
   mysql_close(&mysql);
}

void resolve(int argc, char **argv) {
   int ch;
   while ((ch = getopt(argc, argv, "id")) != -1) {
      switch(ch) {
      case 'i':
         mode = 1;
         filename = argv[2];
         break; 
      case 'd':
         mode = 2;
         tablename = argv[2];
         break;
      default:
         break;
      }
   }
}


int (*Func)(void);

int main(int argc, char **argv) {
   if (argc != 3) {
      printf("Usage: ./insert [-i:-d] [filename:tablename]\n");
      exit(-1);
   }
   resolve(argc, argv);
   if ((!filename && !tablename) || !mode) {
      printf("Usage: ./insert [-i:-d] [filename:tablename]\n");
      exit(-1);
   }
   Func = (mode == 1) ? openFileWriteToDatabase : truncateTable;
   initSql();
   int ret = Func();
   if (ret < 0) {
      printf("error may occure ask for @shilei\n");
      return -1;
   }
   closeSql();
   return ret;
}
