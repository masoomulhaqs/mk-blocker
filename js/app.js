var app = angular.module('app',['mkBlock']);
app.controller('testCtrl', function($scope, mkBlockerAPI){
	// mkBlockerAPI.blockIt();
	console.log(mkBlockerAPI.isBlocked);
	console.log(mkBlockerAPI.blockUI());
	console.log(mkBlockerAPI.unblockUI());
});