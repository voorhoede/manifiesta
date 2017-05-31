const gulp = require('gulp');
const path = require('path');

const paths = require('../lib/paths');

gulp.src(paths.assets + '**/*')
    .pipe(gulp.dest(path.join(paths.static, 'assets')));