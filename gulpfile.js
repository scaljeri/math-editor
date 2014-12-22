/* global require: true */

var gulp = require('gulp'),
    requireDir = require('require-dir'),
    $ = require('gulp-load-plugins')();

global.elements = [
    {input: 'resources/scss/demo.scss', output: 'demo/css/'},
    {input: 'resources/elements/demo-app/demo-app.scss', output: 'demo/custom-elements/demo-app/'}
];

// Load application tasks
(function () {
    'use strict';
    var dir = requireDir('./tasks');

    Object.keys(dir).forEach(function (key) {
        dir[key](gulp, $);
    });
}());

gulp.task('default', ['copy', 'css', 'webserver', /*'livereload',*/ 'watch']);

gulp.task('old-serve', ['clean'], function () {
    gulp.start('copy', 'css', 'old-open');
});

gulp.task('xdefault', ['clean'], function () {
    gulp.start('css');
});

gulp.task('old-open', ['old-watch'], function () {
    //require('open')('http://localhost:3000/demo/index.html');
});