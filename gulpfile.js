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
var libs = [
  'array',
  'object',
  'string',
  'utilities',
];
var distLibs = libs.map(function(component) { return 'dist/' + component + '.js'; });

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
  gulp.src(distLibs)
    .pipe(gulp.dest('tmp'));
  gulp.src('node_modules/underscore/underscore.js')
    .pipe(gulp.dest('tmp'));
  gulp.src('node_modules/chai-fuzzy/index.js')
    .pipe(rename('chai-fuzzy.js'))
    .pipe(gulp.dest('tmp'));
  return gulp.src('spec/*_spec.js')
    .pipe(gulp.dest('tmp'));
});

gulp.task('compile-components', ['compile-libs'], function() {
  return gulp.src('lib/**/*.js')
    .pipe(rename(function(path) {
      path.basename = path.basename.replace(/^_/, '');
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('compile-libs', ['clean'], function() {
  return libs.forEach(function(lib) {
    return gulp.src('lib/' + lib + '/*.js')
      .pipe(concat(lib + '.js'))
      .pipe(gulp.dest('dist'));
  });
});

gulp.task('build', ['compile-components'], function() {
  return gulp.src('dist/**/*.js')
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename = path.basename += '.min';
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return gulp.src(['dist/**/*', 'tmp'])
      .pipe(clean());
});

gulp.task('build-specs', ['build', 'copy-spec-runner', 'copy-mocha-files', 'compile-spec-files']);

gulp.task('spec', ['build-specs'], function() {
  var mochaResult = sh.exec('mocha spec');
  console.log(mochaResult.stdout);
  var testemResult = sh.exec('testem ci');
  console.log(testemResult.stdout);

  gulp.src('tmp')
    .pipe(clean());
  return (testemResult.code && mochaResult.code) ? 1 : 0;
});
