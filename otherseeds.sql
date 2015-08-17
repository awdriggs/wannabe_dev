INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('R2D2', 500000, 'marketBuyer', '$GOOG', 110, 5, 5, 5, 'True', 0, 1, 1);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('C3PO', 100000, 'marketSeller', '$GOOG', 9000, 5, 5, 5, 'True', 1, 1, 0);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('ED209', 100000, 'marketTrader', '$GOOG', 555, 5, 5, 5, 'True', 2, 1, 0);

INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('OptimusPrime', 600000, 'marketBuyer', '$AAPL', 110, 5, 5, 5, 'True', 0, 2, 1);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('Bumblebee', 100000, 'marketSeller', '$AAPL', 9000, 5, 5, 5, 'True', 3, 2, 0);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('Sideswipe', 100000, 'marketTrader', '$AAPL', 555, 5, 5, 5, 'True', 0, 2, 2);

INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('Megatron', 700000, 'marketBuyer', '$FB', 110, 5, 5, 5, 'True', 0, 3, 2);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('Starscream', 100000, 'marketSeller', '$FB', 9000, 5, 5, 5, 'True', 3, 3, 0);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('Thundercracker', 100000, 'marketTrader', '$FB', 555, 5, 5, 5, 'True', 0, 3, 1);

INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('HAL9000', 800000, 'marketBuyer', '$AMZN', 110, 5, 5, 5, 'True', 2, 4, 0);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('T-1000', 100000, 'marketSeller', '$AMZN', 9000, 5, 5, 5, 'True', 1, 4, 0);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('IronGiant', 100000, 'marketTrader', '$AMZN', 555, 5, 5, 5, 'True', 1, 4, 0);

INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('FalseMaria', 900000, 'marketBuyer', '$TWTR', 110, 5, 5, 5, 'True', 0, 5, 2);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('Wall-E', 100000, 'marketSeller', '$TWTR', 9000, 5, 5, 5, 'True', 0, 5, 2);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('Gort', 100000, 'marketTrader', '$TWTR', 555, 5, 5, 5, 'True', 0, 5, 1);

INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('Johnny5', 400000, 'marketBuyer', '$MSFT', 110, 5, 5, 5, 'True', 2, 6, 0);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('Gerty', 100000, 'marketSeller', '$MSFT', 9000, 5, 5, 5, 'True', 2, 6, 0);
INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('MechaGodzilla', 100000, 'marketTrader', '$MSFT', 555, 5, 5, 5, 'True', 0, 6, 2);

INSERT INTO companies (name, startingbalance, currentbalance, profit) VALUES ('BlahCorp', 1000, 1000, 0);
INSERT INTO companies (name, startingbalance, currentbalance, profit) VALUES ('SmellCorp', 1000, 1000, 0);

INSERT INTO stocks (name, price) VALUES('GOOG', 500);
-- INSERT INTO stocks (name, price) VALUES('$AAPL', 55);

INSERT INTO users (username, email, passworddigest, companyname, currentbalance, startingbalance, profit) VALUES ('Thom', 'thom@thom.burp', 'brooklyndonuts', 'TinyMountain', 1000, 1000, 0);
INSERT INTO users (username, email, passworddigest, companyname, currentbalance, startingbalance, profit) VALUES ('Adam', 'adam@adam.squeeze', 'brooklyndonuts', 'NascentBreathers', 1000, 1000, 0);
INSERT INTO users (username, email, passworddigest, companyname, currentbalance, startingbalance, profit) VALUES ('Zhen', 'zhen@zhen.whack', 'queensdonuts', 'SlidingVines', 1000, 1000, 0);


-- INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('R2D2', 500000, 'marketBuyer', '$GOOG', 110, 5, 5, 5, 'True', 0, 1, 1);
-- INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('C3PO', 100000, 'marketSeller', '$GOOG', 9000, 5, 5, 5, 'True', 0, 1, 1);
-- INSERT INTO bots (botname, balance, character, stockinterest, quantity, risktolerance, stepsize, attitude, active, "userId", "stockId", "companyId") VALUES ('ED209', 100000, 'marketTrader', '$GOOG', 555, 5, 5, 5, 'True', 2, 1, 0);