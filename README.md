# mk-blocker
Angular Loader, Blocker, Unblocker

---

##### Add below files to your application

* CSS
	* `mk-blocker.css` *(Uncompressed file)*
	* `mk-blocker.min.css` *(Compressed file)*
	
* JS
	* `mk-blocker.css` *(Uncompressed file)*
	* `mk-blocker.min.css` *(Compressed file)*

Note: All files are avaible in `./src` folder.

##### Inject dependency into your applicaiton

```javascript
	angular.module('yourModule', ['mkBlock']);
```

##### Usage

```javascript
	.controller('yourCtrl', function(mkBlocker){
		mkBlocker.blockUI(); // to block the UI
		mkBlocker.unblockUI(); // to unblock the UI
		mkBlocker.toggleUI(); // to toggle the UI blocking
	});
```
