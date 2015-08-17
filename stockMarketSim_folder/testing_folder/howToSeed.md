
zhentings-MacBook-Pro:wannabe_dev origins$ \psql
psql (9.4.3)
Type "help" for help.

origins=# DROP DATABASE stockbot_app_development
origins-# ;
DROP DATABASE
origins=# CREATE DATABASE stockbot_app_development;
CREATE DATABASE
origins=# \q
zhentings-MacBook-Pro:wannabe_dev origins$ sequelize db:migrate

Sequelize [Node: 0.12.4, CLI: 1.7.4, ORM: 3.5.1, pg: ^4.4.1]

Loaded configuration file "config/config.json".
Using environment "development".
Using gulpfile /usr/local/lib/node_modules/sequelize-cli/lib/gulpfile.js
Starting 'db:migrate'...
Finished 'db:migrate' after 93 ms
== 20150812100142-create-users: migrating =======
== 20150812100142-create-users: migrated (0.041s)

== 20150813204749-create-bots: migrating =======
== 20150813204749-create-bots: migrated (0.035s)

== 20150813205109-create-stocks: migrating =======
== 20150813205109-create-stocks: migrated (0.033s)

== 20150813205338-create-companies: migrating =======
== 20150813205338-create-companies: migrated (0.031s)

zhentings-MacBook-Pro:wannabe_dev origins$ psql -d stockbot_app_development < seeds.sql
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
zhentings-MacBook-Pro:wannabe_dev origins$ 
