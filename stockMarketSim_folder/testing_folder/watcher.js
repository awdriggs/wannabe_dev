// A user model
var user = { id: 0 };
var player = { name: 'john'};

Object.observe(user, function(changes) {
  changes.forEach(function(change) {
  		console.log("HIIIIII this is user");
  });
});

Object.observe(player, function(changes) {
  changes.forEach(function(change) {
  		console.log("HIIIIII, this is player");
  });
});