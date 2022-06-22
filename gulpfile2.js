
// PLUGINS
const gulp = require('gulp');
const chalk = require('chalk');
const log = console.log;
// Images
const imagemin = require('gulp-imagemin');
// JS
const concat = require('gulp-concat');
const terser = require('gulp-terser');
//sourcemap
const sourcemaps = require('gulp-sourcemaps');
// CSS
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const { src, series, parallel, dest, watch } = require('gulp');

// PATH
const jsPath = 'src/assets/js/**/*.js';
const cssPath = 'src/assets/css/**/*.css';


// Creating Ouput files
function copyHtml() {
  return src('src/*.html')
    .pipe(gulp.dest('dist'));
}

// Optimizing Images
function imgTask() {
  return src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

// Minifying Javascript
function jsTask() {
  return src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/js'));
}

// Minifying CSS
function cssTask() {
  return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer(), cssnano()])) //not all plugins work with postcss only the ones mentioned in their documentation
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/css'));
}

// Watching Changes of CSS & JS
function watchTask() {
  log(chalk.red('     • [CHANGE LOGS] •'));
  watch([cssPath, jsPath], { interval: 1000 }, parallel(cssTask, jsTask, copyHtml));
}

exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.copyHtml = copyHtml;
log(chalk.red('     • [WELCOME] •'));
exports.default = series(
  parallel(copyHtml, imgTask, jsTask, cssTask),
  watchTask,
);