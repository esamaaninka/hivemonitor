# hivemonitor
experiments and studying with topic

hivelogs to be sent with hivename as identifier

Taking use of HTTPS required certs and keys, currenlty with root priviledges, change the rights or start the app with 
%sudo npm start

Server running on port 8080
Server running on port 8443

The key's configured with localhost, does not work outside server. 
Using the https to access server causes security warning to the
user.

In production envs if using Heroku, Azure the https stuff would be taken care of by the platform.



Features:
DATA and methods
1 hive schema - ok
2 hivelog schema - ok 
3 hive operations GET,POST, PUT, DELETE
    - GET alland POST ok 
    - TODO: get by id, put and delete
4 hivelog operations GET, POST, PUT, DELETE
    - GET all, POST ok
    - TODO put, delete
5 USER - todo (auth)
6 REST client - ok
7 client - partly done, snippets

Server
1 basic functionality - ok
2 https - partly tested, done
3 authentication, token etc.
4 production version to cloud / raspberry pi

GUI
1 login/front page
2 basic graphs/tables like hivetool?