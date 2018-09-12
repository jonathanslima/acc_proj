var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
//var sass = require('gulp-watch');


// browser-sync task for starting the server.
gulp.task('browserSync', function() {
    //watch files
    var files = [
    './css/style.css',
    './includes/*.php',    
    './*.php',
    './js/*.js'
    ];
 
    //initialize browsersync
    browserSync.init(files, {
    //browsersync with a php server
    proxy: "estatico.dev",
    notify: false
    });
});

gulp.task('sass', function() {
  return gulp.src('./css/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(plumber({
      handleError: function (err) {
        console.log(err)
        this.emit('end')
      }
    }))
    .pipe(sass())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('./css/*.scss', ['sass']); 
  // Other watchers
})

gulp.task('default', ['sass'], function() {
  console.log( 'Feito!' );
});