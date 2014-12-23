/* global require: true */
var es = require('event-stream'),
    print = require('gulp-print'),
    fs = require('fs'),
    path = require('path'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    merge = require('merge-stream');

module.exports = function (gulp, $) {
    'use strict';

    function getFolders(dir) {
        return fs.readdirSync(dir)
            .filter(function (file) {
                return fs.statSync(path.join(dir, file)).isDirectory();
            });
    }
    gulp.task('css', function () {
        var taskList = [],
            folders = getFolders('resources/elements/');

        // https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
        var taskList = folders.map(function (dir) {
            return processSCSS(dir);
        });

        // return merge(tasksList);
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
            ],
            file = element + '/' + element + '.scss';

        return gulp.src('resources/elements/' + file)
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
            .pipe(gulp.dest('demo/custom-elements/' + element));
    }
};