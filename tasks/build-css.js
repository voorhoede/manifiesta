const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');

const paths = require('../lib/paths');
const onStreamError = require('../lib/on-stream-error');

gulp.src(paths.src + 'index.less')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', onStreamError)
    .pipe(autoprefixer({ browsers: ['> 1%', 'last 2 versions'] }))
    .pipe(cleanCss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.static));