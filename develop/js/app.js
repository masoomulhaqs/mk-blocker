var app = angular.module('app', ['mkBlock']);

app.controller('TestCtrl', function($scope, $http, mkBlocker){

	mkBlocker.blockUI();
	
	$scope.block = function(){
		mkBlocker.blockUI();
	};
	$scope.unblock = function(){
		mkBlocker.unblockUI();
	};
	$scope.toggleBlock = function(){
		mkBlocker.toggleUI();
	};
	$scope.setSpinColor = function(color){
	 	mkBlocker.spinColor = color;
	}
	$scope.$watch(function(){
		return mkBlocker.isBlocked;
	}, function(){
		$scope.isBlocked = mkBlocker.isBlocked;
	});

	$scope.config = {};
	$scope.initConfig = function(){
		$http.get('assets/data/config.json')
		.success(function(data){
			$scope.config = data;
		}).error(function(data){
			if(console && console.warn){
				console.warn("Error occured while Configuring data.");
			}
		});
	}
	$scope.initConfig();
});