var gulp = require('gulp');

/** ### Include Plugins ### **/

var compass = require('gulp-compass'),
	cleanCSS = require('gulp-clean-css'),
	ngAnnotate = require('gulp-ng-annotate'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create();

/** ### Path Definitions ### **/

var basePaths = {
		bower: "./bower_components/",
		develop: "./develop/",
		build: "./build/",
		production: "./src/"
	};
var	paths = {
		images: {},
		compass: {
			css: basePaths.production, // THIS SHOULD BE SAME AS DEST TO CREATE SOURCEMAPS
			sass: basePaths.develop + "scss"
		},
		scss: {
			src: basePaths.develop + "scss/*.scss",
			dest: basePaths.build + "css"
		},
		css:{
			src: [
				basePaths.bower + "bootstrap/dist/css/bootstrap.min.css",
				basePaths.bower + "bootstrap-overrides/css/bootstrap-overrides.min.css",
				basePaths.production + "mk-blocker.css"
			],
			dest: basePaths.build + "css"
		},
		js:{
			src: [
				basePaths.bower + "angular/angular.min.js",
				basePaths.develop + "js/mk-blocker.js", 
				basePaths.develop + "js/app.js"
			],
			productionSrc: basePaths.develop + "js/mk-blocker.js",
			dest: basePaths.build + "js"
		}
	};

gulp.task("compass", function(){
	return gulp.src(paths.scss.src)
		.pipe(compass({
			css: paths.compass.css,
			sass: paths.compass.sass,
			require: ["compass"],
			output_style: 'expanded',
			sourcemap: true
		}))
		.pipe(gulp.dest(basePaths.production))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(cleanCSS())
		.pipe(gulp.dest(basePaths.production));
});

gulp.task("build:css", ["compass"], function(){

	return gulp.src(paths.css.src)
		.pipe(concat('default.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest(paths.css.dest));

});

gulp.task("production:js", function(){

	return gulp.src(paths.js.productionSrc)
		.pipe(ngAnnotate())
		.pipe(gulp.dest(basePaths.production))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(basePaths.production));

});

gulp.task("build:js", ["production:js"], function(){

	console.log(paths.js.src);

	return gulp.src(paths.js.src)
		.pipe(ngAnnotate())
		.pipe(concat('default.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.dest));
});

gulp.task("server", function(){
	browserSync.init({
		notify: false,
		server: {
			baseDir: "./"
		}
	});
});

gulp.task("build", ["build:css", "build:js"]);

gulp.task("watch", function(){

	gulp.watch(paths.scss.src, ["build:css"]);
	gulp.watch(paths.js.src, ["build:js"]);

});

gulp.task("default", ["server", "build", "watch"]);


