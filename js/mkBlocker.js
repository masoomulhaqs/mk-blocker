var mkBlock = angular.module('mkBlock',[]);

mkBlock.service('mkBlockerAPI', function() {
	this.isBlocked = true;
	this.blockUI = function(){
		this.isBlocked = true;
		return this.isBlocked;
	};
	this.unblockUI = function(){
		this.isBlocked = false;
		return this.isBlocked;
	};
});

mkBlock.controller('mkBlockCtrl', function($scope, mkBlockerAPI){
	var api = mkBlockerAPI;
	$scope.isBlocked = api.isBlocked;
	toggleit = function(){
		console.log('key');
	};
	$scope.$watch('api.isBlocked', toggleit());
});
mkBlock.directive('mkBlocker', function(mkBlockerAPI){
	return{
		restrict: 'E',
		replace: true,
		controller: 'mkBlockCtrl',
		template: '<div data-ng-if="!isBlocked" class="mk-overlay-wrap"><div class="mk-overlay"><p>loading....</p><span class="mk-spin"></span></div></div>'
	};
});