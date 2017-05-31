const gulp = require('gulp');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const paths = require('../lib/paths');
const onStreamError = require('../lib/on-stream-error');

gulp.src(['src/components/**/*.js'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('index.js'))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .on('error', onStreamError)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.static));