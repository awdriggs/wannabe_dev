// var objWatcher = function () {

// 	console.log('objWatcher loaded...')
// 	// object.watch by Eli Grey, http://eligrey.com
// 	if (!Object.prototype.watch) {
// 		Object.defineProperty(Object.prototype, "watch", {
// 			  enumerable: false
// 			, configurable: true
// 			, writable: false
// 			, value: function (prop, handler) {
// 				var
// 				  oldval = this[prop]
// 				, getter = function () {
// 					return oldval;
// 				}
// 				, setter = function (newval) {
// 					if (oldval !== newval) {
// 						handler.call(this, prop, oldval, newval);
// 						oldval = newval;
// 					}
// 					else { return false }
// 				};
// 				if (delete this[prop]) { // can't watch constants
// 					Object.defineProperty(this, prop, {
// 						  get: getter
// 						, set: setter
// 						, enumerable: true
// 						, configurable: true
// 					});
// 				}
// 			}
// 		});
// 	}

// 	if (!Object.prototype.unwatch) {
// 		Object.defineProperty(Object.prototype, "unwatch", {
// 			  enumerable: false
// 			, configurable: true
// 			, writable: false
// 			, value: function (prop) {
// 				var val = this[prop];
// 				delete this[prop]; // remove accessors
// 				this[prop] = val;
// 			}
// 		});
// 	};

// };
// /*
// * Example usage:
// 	var o = {p: 1};
// 	o.watch("p", function (id, oldval, newval) {
// 	    console.log( "o." + id + " changed from " + oldval + " to " + newval );
// 	    return newval;
// 	});
// 	o.p = 2; // should log the change
// 	o.p = 2; // should do nothing
// */

// module.exports = objWatcher;