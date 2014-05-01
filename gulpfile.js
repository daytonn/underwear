var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var docco = require('gulp-docco');
var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

function minifyLib(lib) {
  return gulp.src('dist/' + lib + '.js')
    .pipe(uglify())
    .pipe(rename(lib + '.min.js'))
    .pipe(gulp.dest('dist'));
}

function compileLib(lib) {
  return gulp.src('lib/' + lib + '.js')
    .pipe(browserify())
    .pipe(gulp.dest('dist'));
}

function buildDocs() {
  return gulp.src("lib/*.js")
    .pipe(docco({ layout: 'linear' }))
    .pipe(gulp.dest('docs'));
}

gulp.task('build', function() {
  [
    "array",
    "object",
    "string",
    "utilities",
    "underwear"
  ].forEach(function(lib) {
    compileLib(lib);
    minifyLib(lib);
  });
  return buildDocs();
});
