// PLUGINS
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const purgeCSS = require('gulp-purgecss');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const chalk = require('chalk');

// Declare
const log = console.log;
const { src, series, dest, watch, parallel } = require('gulp');
log(chalk.red('     • [SUNSET BAR&CAFE] •'));

// ROOT PATH
const app = 'app';
const htmlPath = 'app/**/*.html';
// PATH SRC
const jsPath = 'app/src/assets/js/**/*.js';
const cssPath = 'app/src/assets/css/**/*.css';
const imgPath = 'app/src/images/*';
// PATH DIST
const root1PATH = 'app/dist'
const css1PATH = 'app/dist/assets/css'
const js1PATH = 'app/dist/assets/js'
const img1PATH = 'app/dist/images/'

// clean dist
function clean1 () {
    return src(root1PATH)
    .pipe(clean());
}

// HTML
function html() {
    return src('app/*.html')
        .pipe(dest('app/dist/'))
}

// Minify + Combine CSS
function compileCSS() {
    return src(cssPath)
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({compatibility: 'chrome105',}),)
    .pipe(purgeCSS({ content: ['app/src/**/*.html']}))
    .pipe(rename({suffix: '.min', }),)
    .pipe(dest(css1PATH))
    .pipe(browserSync.stream());
}

// Minify + Combine JS
function compileJS() {
    return src(jsPath)
        .pipe(terser())
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(rename({ suffix: '.min', }),)
        .pipe(dest(js1PATH))
        .pipe(browserSync.stream());
}

// Compress (JPEG, PNG, GIF, SVG, JPG)
function optimizeIMAGES() {
    return src(imgPath)
    .pipe(imagemin(
        [imagemin.gifsicle({interlaced: true,}),
        imagemin.mozjpeg({quality: 75,progressive: true,}),
        imagemin.optipng({optimizationLevel: 5,}),
        imagemin.svgo({plugins: [{removeViewBox: true,},{cleanupIDs: false,},],}),]),
    )
    .pipe(gulp.dest(img1PATH));
}

// Watch file changes
function watch1() {
    browserSync.init({
        server: {
            baseDir: app,
        },
    });
    log(chalk.red('     • [CHANGE LOGS] •'));
    watch(cssPath, series(compileCSS));
    watch(jsPath, series(compileJS));
    watch(htmlPath,).on('change', browserSync.reload);
}

// Call Function
exports.clean1 = clean1;
exports.html = html;
exports.compileCSS = compileCSS;
exports.compileJS = compileJS;
exports.optimizeIMAGES = optimizeIMAGES;
exports.watch1 = watch1;
exports.default = series(
    parallel(html, compileCSS, compileJS, optimizeIMAGES), clean1, watch1,
);






