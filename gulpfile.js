var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var exec = require('child_process').exec;
var sh = require('execSync');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var _ = require("underscore");
var libs = [
  'array',
  'object',
  'string',
  'utilities',
];
var distLibs = libs.map(function(component) { return 'dist/' + component + '.js'; });
distLibs.push('dist/underwear.js');

function mkTmpDir() {
  if (!fs.existsSync('tmp')) fs.mkdirSync('tmp');
}

gulp.task('build-specs', ['build'], function() {
  mkTmpDir();
  return gulp.src([
    'dist/underwear.js',
    'spec/runner.html',
    'node_modules/mocha/mocha.js',
    'node_modules/mocha/mocha.css',
    'node_modules/chai/chai.js',
    'node_modules/underscore/underscore.js',
    'node_modules/chai-fuzzy/index.js',
    'spec/*_spec.js'
  ])
    .pipe(gulp.dest('tmp'));
});

gulp.task('compile-underwear', ['clean'], function() {
  return gulp.src('lib/**/*.js')
    .pipe(concat('underwear.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('compile-methods', ['compile-libs'], function() {
  return libs.forEach(function(lib) {
    fs.readdirSync('lib/' + lib).forEach(function(method) {
      gulp.src('lib/' + lib + '/' + method)
        .pipe(gulp.dest('dist/' + lib));
      return gulp.src(['lib/underwear.js', 'lib/' + lib + '/' + method])
        .pipe(concat(method))
        .pipe(gulp.dest('dist/standalone/' + lib));
    });
  });
});

gulp.task('compile-libs', ['compile-underwear'], function() {
  return libs.forEach(function(lib) {
    return gulp.src(['lib/underwear.js', 'lib/' + lib + '/*.js'])
      .pipe(concat(lib + '.js'))
      .pipe(gulp.dest('dist'));
  });
});

gulp.task('minify', ['compile-methods'], function() {
  gulp.src(['lib/**/*.js'])
    .pipe(concat('underwear.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
  return libs.forEach(function(lib) {
    return gulp.src(['lib/underwear.js', 'lib/' + lib + '/*.js'])
      .pipe(concat(lib + '.js'))
      .pipe(uglify())
      .pipe(rename(function(path) {
        path.basename = path.basename += '.min';
      }))
      .pipe(gulp.dest('dist'));
  });
});

gulp.task('build', ['minify']);

gulp.task('clean', function() {
  return gulp.src(['dist/**/*', 'tmp'])
      .pipe(clean());
});

gulp.task('spec', ['build-specs'], function() {
  var mochaResult = sh.exec('mocha spec');
  console.log(mochaResult.stdout);
  var testemResult = sh.exec('testem ci');
  console.log(testemResult.stdout);

  gulp.src('tmp/**/*')
    .pipe(clean());
  return (testemResult.code && mochaResult.code) ? 1 : 0;
});
