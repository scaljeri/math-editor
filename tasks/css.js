/* global require: true */
var es = require('event-stream'),
    print = require('gulp-print'),
    rename = require('gulp-rename');

module.exports = function (gulp, $) {
    'use strict';

    gulp.task('css', function () {
        var cssFilter = $.filter(['*.css']);

        var processors = [
            require('autoprefixer-core')({
                browsers: ['last 2 versions']
            }),
            require('css-mqpacker')
            //require('csswring')
        ];

        var taskList = [];

        global.elements.forEach(function (element) {
            taskList.push(
                gulp.src(element.input)
                .pipe(print())
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
                .pipe(gulp.dest(element.output))
            );

            return es.merge.apply(es, taskList);
        });
    });
};