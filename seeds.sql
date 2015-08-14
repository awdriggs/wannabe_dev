INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('Jimmy', 1000, 'pumper', '$GOOGL', 500, 5, 5, 5, 'True', 0, 1, 1);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('Roger', 1000, 'pumper', '$GOOGL', 500, 5, 5, 5, 'True', 0, 1, 2);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('Tim', 1000, 'pumper', '$AAPL', 500, 5, 5, 5, 'True', 0, 2, 1);

INSERT INTO companies (name, startingbalance, currentbalance, profit) VALUES ('BlahCorp', 1000, 1000, 0);
INSERT INTO companies (name, startingbalance, currentbalance, profit) VALUES ('SmellCorp', 1000, 1000, 0);

INSERT INTO stocks (name, price) VALUES('$GOOGL', 55);
INSERT INTO stocks (name, price) VALUES('$AAPL', 55);

INSERT INTO users (username, password, companyname, currentbalance, startingbalance, profit) VALUES ('Thom', 'brooklyndonuts', 'TinyMountain', 1000, 1000, 0);
INSERT INTO users (username, password, companyname, currentbalance, startingbalance, profit) VALUES ('Adam', 'brooklyndonuts', 'NascentBreathers', 1000, 1000, 0);
INSERT INTO users (username, password, companyname, currentbalance, startingbalance, profit) VALUES ('Zhen', 'queensdonuts', 'SlidingVines', 1000, 1000, 0);