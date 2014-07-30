var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var es6ify = require("es6ify");
var jadeify = require("jadeify");

gulp.task('watch', function() {
  var bundler = watchify('./app/client/main.js')
    .transform(es6ify)
    .transform(jadeify)
    .on('update', rebundle)
    .on("log", gutil.log);

  function rebundle () {
    return bundler.bundle({ debug: true })
      .on('error', function(e) {
        gutil.log('Browserify Error', e);
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./app/.client/'))
  }

  return rebundle()
});