const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const prefix = require('gulp-autoprefixer');
const sourcemap = require('gulp-sourcemaps');

/**
 * Sass configuration tasks
 */

// Sass source
const sass_files = './src/sass/style.scss';

// CSS destination
const css_dest = './src/css';

// Development options
const sass_dev_options = {
  outputStyle: 'expanded'
};

// Production options
const sass_prod_options = {
  outputStyle: 'compressed'
};

// Autoprefixer options
/* const prefixer_options = {
  browsers: ['last 2 versions', '>5%']
}; */

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
    .pipe(sourcemap.init())
    .pipe(sass(sass_prod_options).on('error', sass.logError))
    .pipe(sourcemap.write())
    .pipe(prefix())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(css_dest));
});

// Task 'babel' - run with 'gulp bable'
gulp.task('babel', function() {
  return gulp
    .src('./src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./src/js/js-transpiled'));
});

// Task 'watch' - run with command 'gulp watch'
gulp.task('watch', function() {
  gulp.watch([sass_files, './src/js/*.js'], ['sassdev', 'sassprod', 'babel']);
});

// Default task - run with command 'gulp'
gulp.task('default', ['sassdev', 'sassprod', 'babel', 'watch']);

// Task to duild for production - run with command 'gulp build'
gulp.task('build', ['sassprod', 'babel']);
