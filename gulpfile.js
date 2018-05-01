const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

/**
 * Sass configuration tasks
 */

// Sass source
const sass_files = './sass/style.scss';

// CSS destination
const css_dest = './css';

// Development options
const sass_dev_options = {
  outputStyle: 'expanded'
};

// Production options
const sass_prod_options = {
  outputStyle: 'compressed'
};

// Task to compile sass for development - run with 'gulp sassdev'
gulp.task('sassdev', function() {
  return gulp
    .src(sass_files)
    .pipe(sass(sass_dev_options).on('error', sass.logError))
    .pipe(gulp.dest(css_dest));
});

// Task to compile sass for production - run with 'gulp sassprod'
gulp.task('sassprod', function() {
  return gulp
    .src(sass_files)
    .pipe(sass(sass_prod_options).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(css_dest));
});

// Task 'watch' - run with command 'gulp watch'
gulp.task('watch', function() {
  gulp.watch(sass_files, ['sassdev', 'sassprod']);
});

// Default task - run with command 'gulp'
gulp.task('default', ['sassdev', 'sassprod', 'watch']);
