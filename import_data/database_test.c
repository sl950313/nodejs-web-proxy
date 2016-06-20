#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

void test(int num_fork);

int main(int argc, char **argv) {
   int opt = 0;
   int num_fork = 0;

   while ((opt = getopt(argc, argv, "f:")) != -1) {
      switch (opt) {
      case 0:
         break;
      case 'f':
         num_fork = atoi(optarg);
         break;
      }
   }


   printf("num_fork = %d\n", num_fork);
   test(num_fork);
   return 0;
}

void test(int num_fork) {
   int i = 0;
   pid_t pid = -1;
   for (i = 0; i < num_fork; ++i) {
      pid = fork();
      if (pid <= (pid_t)0) {
         sleep(1);
         break;
      }
   }

   if (pid < (pid_t)0) {
      fprintf(stderr, "Problem forking worker no. %d\n",i);
      perror("fork failed.");
      return ;
   }
   
   const char *command = "nodejs";
   const char *param = "/var/www/html/import_data/test_database.js";
   if (pid == (pid_t)0) {
      execlp(command, "nodejs", param, NULL);
      perror(command);

      /*
      f = fdopen(mypipe[1], "w");
      if (f == NULL) {
         perror("open pipe for writing failed.");
         exit(10);
      }
      fprintf(f, "%d", i);
      fclose(f);
      */
      exit(-1);
   } else {
   }
   return ;
}
