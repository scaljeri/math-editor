/* global require: true */
var es = require('event-stream'),
    print = require('gulp-print'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    argv = require('yargs').argv; // for args parsing

module.exports = function (gulp, $) {
    'use strict';

    var scss2css = require('./utils')(gulp, $).scss2css;

    gulp.task('main-css', function () {
        return scss2css('resources/scss/demo.scss', 'demo/css', {
                sourceMap: argv['sourcemap'] === true
            })
            .pipe(livereload());
    });
}