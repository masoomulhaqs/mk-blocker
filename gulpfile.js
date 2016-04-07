var gulp = require('gulp');

/** ### Include Plugins ### **/

var compass = require('gulp-compass');
var cleanCSS = require('gulp-clean-css');
var jslint = require('jslint');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var markdown = require('markdown-to-html');

/** ### Path Definitions ### **/
var pathCSS = 'assets/css/';
var jsMainFile = 'src/mk-blocker.js';
var jsAppFile = 'assets/js/';

var paths = {
	defaults: {
		src: null,
		productionFolder: "src",
	},
	images: {},
	scss: {
		takenFolder: "build/scss",
		files: [
			"build/scss/*.scss"
		]
	},
	css:{
		takenFolder: "export/css",
		files: [
			"build/css/mk-blocker.css"
		],
		exportFolder: "export/css",
		minfiedFolder: "src",
		minfiedFolderMath: "src/*.min.css",
		minifiedFiles : [
			"bower_components/bootstrap/dist/css/bootstrap.min.css",
			"bower_components/bootstrap-overrides/css/bootstrap-overrides.min.css",
			"build/css/mk-blocker.css"
		]
	},
	js:{
		takenFolder: "build/js",
		productionFiles: "build/js/mk-blocker.js",
		files: [	
			"build/js/mk-blocker.js", 
			"build/js/app.js"
		],
		exportFolder: "export/js",
		minifiedFiles : [
			"bower_components/angular/angular.min.js",
			"bower_components/angular-route/angular-route.min.js",
			"build/js/mk-blocker.js", 
			"build/js/app.js"
		]
	}
};

function getDestination(path){
	console.log(path);
	if(path){
		return path;
	}else if(paths.defaults.productionFolder){
		return paths.defaults.productionFolder;
	}
}

function setExport(path){
	path = path.split('.');
	path[0] +=  '.min';
	return path.join('.');
}

gulp.task("compass", function(){
	return gulp.src(paths.scss.files)
		.pipe(compass({
			css: paths.defaults.productionFolder,
			sass: paths.scss.takenFolder,
			image: 'assets',
			require: 'breakpoint',
			output_style: 'expanded'
		}))
		.pipe(gulp.dest("build/css"))
		.pipe(rename({
			suffix : ".min"
		}))
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.defaults.productionFolder));
});

gulp.task("concatCSS", ["compass"],function(){
	console.log(paths.css.minifiedFiles);
	return	gulp.src(paths.css.minifiedFiles)
		.pipe(concat("default.css"))
		.pipe(gulp.dest(paths.css.takenFolder));
});

gulp.task("unifyJS", function(){
	return gulp.src(paths.js.files)
		.pipe(ngAnnotate())
		.pipe(rename({ suffix: ".min"}))
		.pipe(uglify())
		.pipe(concat("default.js"))
		.pipe(gulp.dest(paths.js.exportFolder));
});

gulp.task("srcJS", function(){
	return gulp.src(paths.js.productionFiles)
		.pipe(ngAnnotate())
		.pipe(gulp.dest(paths.defaults.productionFolder))
		.pipe(rename({ suffix: ".min"}))
		.pipe(uglify())
		.pipe(gulp.dest(paths.defaults.productionFolder));
});

gulp.task("segregateJS", ["unifyJS", "srcJS"], function(){
	return gulp.src(paths.js.minifiedFiles)
		.pipe(concat("default.js"))
		.pipe(gulp.dest(paths.js.exportFolder));
});

gulp.task("watchSCSS", function(){
	gulp.watch(paths.scss.files, ["concatCSS"]);
});

gulp.task("watchFiles", function(){
	gulp.watch(paths.scss.files, ["concatCSS"]);
	gulp.watch(paths.js.files, ["segregateJS"]);
});

/** ### Add all the task to default here ### **/

gulp.task("default", ["concatCSS","segregateJS","watchFiles"]);


// .pipe(rename(function(path){
// 		path.basename += ".min";
// 		path.extname = path.extname;
// 		// temp = paths.defaults.productionFolder + '/' + path.basename + path.extname;
// 	}))


// if(paths.css.minifiedFiles.indexOf(temp)==-1){
// 	paths.css.minifiedFiles.push(temp);
// }


