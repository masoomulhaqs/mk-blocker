# mk-blocker
Angular Loader, Blocker, Unblocker

##### Include following files
```
	src/js/mk-blocker.js (or) src/js/mk-blocker.min.js
	src/css/mk-blocker.css (or) src/css/mk-blocker.min.css
```

##### Inject dependency into your applicaiton
```javascript
	angular.module('yourModule', ['mkBlock']);
```

##### Inject mkBlocker service to your controller
```javascript
	.controller('yourCtrl', function(mkBlocker){
		mkBlocker.blockUI(); // to block the UI
		mkBlocker.unblockUI(); // to unblock the UI
		mkBlocker.toggleUI(); // to toggle the UI blocking
	});
```
