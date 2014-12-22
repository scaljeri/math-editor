/* global require: true */
var es = require('event-stream'),
    print = require('gulp-print'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

module.exports = function (gulp, $) {
    'use strict';

    gulp.task('css', function () {
        var taskList = [];

        global.elements.forEach(function (element) {
            taskList.push(processSCSS(element));
        });

        return es.merge.apply(es, taskList)
                .pipe(livereload());
    });

    function processSCSS(element) {
        var cssFilter = $.filter(['*.css']),

            processors = [
                require('autoprefixer-core')({
                    browsers: ['last 2 versions']
                }),
                require('css-mqpacker')
                //require('csswring')
            ];

        return gulp.src(element.input)
        /*
            .pipe(print())
            .pipe($.sourcemaps.init())
            */
            .pipe($.sass({
                errLogToConsole: true
            })) /*
            .pipe($.sourcemaps.write({
                includeContent: false
            }))
            .pipe($.sourcemaps.init({
                loadMaps: true
            }))*/
            .pipe($.postcss(processors))/*
            .pipe($.sourcemaps.write('.'))
            .pipe(cssFilter)
            .pipe(cssFilter.restore())
            .pipe($.size({
                showFiles: true
            })) */
            .pipe(gulp.dest(element.output))
    }
};