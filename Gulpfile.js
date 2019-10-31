var gulp        = require('gulp');
var babel       = require('gulp-babel');
var del         = require('del');

function clean () {
    return del('lib');
}

function lint () {
    var eslint = require('gulp-eslint');

    return gulp
        .src([
            'src/**/*.js',
            'test/**/*.js',
            'Gulpfile.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function build () {
    return gulp
        .src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
}

exports.clean = clean;
exports.lint  = lint;
exports.build = gulp.parallel(gulp.series(clean, build), lint);
exports.test  = gulp.series(exports.build);
