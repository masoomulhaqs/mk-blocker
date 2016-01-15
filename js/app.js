var app = angular.module('app',['mkBlock']);
app.controller('testCtrl', function($scope, mkBlockerAPI){
	$scope.block = function(){
		mkBlockerAPI.blockUI();
		console.log('block: '+mkBlockerAPI.isBlocked);
	};
	$scope.unblock = function(){
		mkBlockerAPI.unblockUI();
		console.log('unblock: '+mkBlockerAPI.isBlocked);
	};
});