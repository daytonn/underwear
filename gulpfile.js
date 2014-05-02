var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var docco = require('gulp-docco');
var exec = require("child_process").exec;
var sh = require('execSync');
var fs = require("fs");
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
  return gulp.src('lib/*.js')
    .pipe(docco({ layout: 'linear' }))
    .pipe(gulp.dest('docs'));
}

function mkTmpDir() {
  if (!fs.existsSync('tmp')) fs.mkdirSync('tmp');
}

gulp.task('copy-spec-runner', function() {
  mkTmpDir();
  return gulp.src('spec/runner.html')
    .pipe(gulp.dest('tmp'));
});

gulp.task('copy-mocha-files', function() {
  mkTmpDir();
  return gulp.src([
    'node_modules/mocha/mocha.js',
    'node_modules/mocha/mocha.css',
    'node_modules/chai/chai.js'
  ]).pipe(gulp.dest('tmp'));
});

gulp.task('compile-spec-files', function() {
  mkTmpDir();
  return gulp.src('spec/*.js')
    .pipe(browserify())
    .pipe(gulp.dest('tmp'));
});

gulp.task('build', function() {
  [
    'array',
    'object',
    'string',
    'utilities',
    'underwear'
  ].forEach(function(lib) {
    compileLib(lib);
    minifyLib(lib);
  });
  return buildDocs();
});

gulp.task('build-specs', ['copy-spec-runner', 'copy-mocha-files', 'compile-spec-files']);

gulp.task('spec', ['build', 'build-specs'], function() {
  var mochaResult = sh.exec('mocha spec');
  console.log(mochaResult.stdout);
  var testemResult = sh.exec('testem ci');
  console.log(testemResult.stdout);

  gulp.src("tmp")
    .pipe(clean());
  return (testemResult.code && mochaResult.code) ? 1 : 0;
});
