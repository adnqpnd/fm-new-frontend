'use strict';

var gulp = require('gulp'),
sass = require('gulp-ruby-sass'),
browserSync = require('browser-sync'),
minifycss = require('gulp-minify-css'),
rename = require('gulp-rename'),
reload = browserSync.reload;


var stylesDir = 'app/styles/',
scssDir = 'app/scss/',
cssBuildDir = 'build/css'

//compile sass to css
gulp.task('sass', function() {
  console.log('enter sass');
  return sass(scssDir + 'main.scss',{style: 'expanded'})
  .on('error', function(err) {
  	console.error('Error',err.message);
  })
  .pipe(gulp.dest(stylesDir))
  .pipe(reload({stream:true}))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest(cssBuildDir));
});

// watch files for changes and reload
gulp.task('serve', function() {
	console.log('enter serve');
  browserSync({
    server: {
      baseDir: 'app'
    }
  });
    
  gulp.watch(['*.html','scripts/**/*.js'], {cwd: 'app'}, reload);
  gulp.watch('app/scss/*.scss',['sass']);
});






