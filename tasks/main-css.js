/* global require: true */
var es = require('event-stream'),
    print = require('gulp-print'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

module.exports = function (gulp, $) {
    'use strict';

    gulp.task('main-css', function () {
        var cssFilter = $.filter(['*.css']),

            processors = [
                require('autoprefixer-core')({
                    browsers: ['last 2 versions']
                }),
                require('css-mqpacker')
                //require('csswring')
            ];

        return gulp.src('resources/scss/demo.scss')
            /*
            .pipe(print())
            .pipe($.sourcemaps.init())
            */
            .pipe($.sass({
                errLogToConsole: true
            }))
            /*
            .pipe($.sourcemaps.write({
                includeContent: false
            }))
            .pipe($.sourcemaps.init({
                loadMaps: true
            }))*/
            .pipe($.postcss(processors))
            /*
            .pipe($.sourcemaps.write('.'))
            .pipe(cssFilter)
            .pipe(cssFilter.restore())
            .pipe($.size({
                showFiles: true
            })) */
            .pipe(gulp.dest('demo/css'))
            .pipe(livereload());
    });
}