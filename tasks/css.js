/* global require: true */
var es = require('event-stream'),
    print = require('gulp-print');

module.exports = function (gulp, $) {
    'use strict';

    gulp.task('css', function () {
        var cssFilter = $.filter(['*.css']),
            target = 'demo/custom-elements/';

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
                gulp.src('resources/elements/' + element + '/' + element + '.scss')
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
                .pipe(gulp.dest(target + element + '/'))
            );

            return es.merge.apply(es, taskList);
        });
    });
};