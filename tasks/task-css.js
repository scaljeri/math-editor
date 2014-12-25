/* global require: true */
var es = require('event-stream'),
    fs = require('fs'),
    path = require('path'),
    livereload = require('gulp-livereload'),
    merge = require('gulp-merge');

module.exports = function (gulp, $) {
    'use strict';
    var scss2css = require('./utils')(gulp, $).scss2css;

    function getFolders(dir) {
        return fs.readdirSync(dir)
            .filter(function (file) {
                return fs.statSync(path.join(dir, file)).isDirectory();
            });
    }

    gulp.task('css', function () {
        var taskList = [],
            folders = getFolders('resources/elements/');

        console.log("COMPILE SCSS");

        // https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
        var taskList = folders.map(function (dir) {
            return scss2css('resources/elements/' + dir + '/*.scss',    // input
                           'demo/custom-elements/' + dir,               // output
                           { sourceMap: true});                         // config
        });

        merge(taskList)
        //return es.merge.apply(es, taskList)
            .pipe(livereload());
    });
};