/* global require: true */

module.exports = function (gulp, $) {
    'use strict';

    gulp.task('css', function () {
        var cssFilter = $.filter(['*.css']),
            target = 'demo/css';

        var processors = [
            require('autoprefixer-core')({
                browsers: ['last 2 versions']
            }),
            require('css-mqpacker')
            //require('csswring')
        ];

        return gulp.src('resources/scss/demo.scss')
            .pipe($.sourcemaps.init())
            .pipe($.sass({
                errLogToConsole: true
            }))
            .pipe($.sourcemaps.write({
                includeContent: false
            }))
            .pipe($.sourcemaps.init({
                loadMaps: true
            }))
            .pipe($.postcss(processors))
            .pipe($.sourcemaps.write('.'))
            .pipe(cssFilter)
            .pipe(cssFilter.restore())
            .pipe($.size({
                showFiles: true
            }))
            .pipe(gulp.dest(target));
    });
};