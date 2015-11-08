var mkBlock = angular.module('mkBlock',[]);

mkBlock.factory('mkBlockerAPI', function() {
	// this.blockIt = function(){
	// 	return true;
	// };
	// this.UnblockIt =false;
	return{
		isBlocked: null,
		blockIt : function(){
			this.isBlocked  = true;
			console.log(true);
		},
		unblockIt : function(){
			this.isBlocked  = false;
			console.log(false);
		}
	}
});
mkBlock.controller('mkBlockCtrl', function($scope, mkBlockerAPI){
	$scope.blocked = true;
	$scope.api = mkBlockerAPI;
	toggleit = function(){
		console.log('key');
	};
	$scope.$watch('api.isBlocked', toggleit());
	$scope.block = function(){
		$scope.blocked = false;
	};
	$scope.unblock = function(){
		$scope.blocked = true;
	};
});
mkBlock.directive('mkBlocker', function(mkBlockerAPI){
	return{
		restrict: 'E',
		replace: true,
		controller: 'mkBlockCtrl',
		template: '<div ng-if="!blocked" class="mk-overlay-wrap"><div class="mk-overlay"><p>loading....</p><span class="mk-spin"></span></div></div>',
		link: function(scope, ele, attr){
			// scope.blocked = checkit();
			// showIt();
		}
	};
});