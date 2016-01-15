var app = angular.module('app',['mkBlock']);
app.controller('testCtrl', function($scope, mkBlockerAPI){
	// unblock();
	// console.log(mkBlockerAPI.blockIt());
	console.log(mkBlockerAPI.unblockIt());
	mkBlockerAPI.blockIt()
	mkBlockerAPI.unblockIt()
});