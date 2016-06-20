CFLAGS = -I /usr/local/mysql/include 
CLIB = -L /usr/local/mysql/lib/ -lmysqlclient
CC = g++
 
sql: insert_data.o
	g++ -o sql insert_data.o -L /usr/local/mysql/lib/ -lmysqlclient
insert_data.o:insert_data.cpp
	g++ -c insert_data.cpp -I /usr/local/mysql/include
clean:
	rm -rf sql insert_data.o
