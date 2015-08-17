INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('R2D2', 500000, 'marketBuyer', '$GOOG', 110, 5, 5, 5, 'True', 3, 1, 1);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('C3PO', 100000, 'marketSeller', '$GOOG', 9000, 5, 5, 5, 'True', 3, 1, 1);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('ED209', 100000, 'marketTrader', '$GOOG', 555, 5, 5, 5, 'True', 2, 1, 2);

INSERT INTO companies (name, startingbalance, currentbalance, profit) VALUES ('BlahCorp', 1000, 1000, 0);
INSERT INTO companies (name, startingbalance, currentbalance, profit) VALUES ('SmellCorp', 1000, 1000, 0);

INSERT INTO stocks (name, price) VALUES('GOOG', 500);
-- INSERT INTO stocks (name, price) VALUES('$AAPL', 55);

INSERT INTO users (username, email, passworddigest, companyname, currentbalance, startingbalance, profit) VALUES ('Thom', 'thom@thom.burp', 'brooklyndonuts', 'TinyMountain', 1000, 1000, 0);
INSERT INTO users (username, email, passworddigest, companyname, currentbalance, startingbalance, profit) VALUES ('Adam', 'adam@adam.squeeze', 'brooklyndonuts', 'NascentBreathers', 1000, 1000, 0);
INSERT INTO users (username, email, passworddigest, companyname, currentbalance, startingbalance, profit) VALUES ('Zhen', 'zhen@zhen.whack', 'queensdonuts', 'SlidingVines', 1000, 1000, 0);