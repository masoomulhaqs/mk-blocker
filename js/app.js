var app = angular.module('app',['mkBlock']);
app.controller('testCtrl', function($scope, mkBlockerAPI){
	// mkBlockerAPI.blockIt();
	console.log(mkBlockerAPI.isBlocked);
	$scope.block = function(){
		console.log('block');
		mkBlockerAPI.blockUI();
		console.log(mkBlockerAPI.isBlocked);
	};
	$scope.unblock = function(){
		console.log('unblock');
		mkBlockerAPI.unblockUI();
		console.log(mkBlockerAPI.isBlocked);
	};
});