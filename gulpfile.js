/* global require: true */

var gulp = require('gulp'),
    requireDir = require('require-dir'),
    $ = require('gulp-load-plugins')();

global.elements = [
    {input: 'resources/elements/glitch-effect/glitch-effect.scss', output: 'demo/custom-elements/glitch-effect/'},
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

gulp.task('serve', ['copy', 'css', 'main-css', 'webserver', 'watch']);

gulp.task('open', ['watch'], function () {
    require('open')('http://localhost:8080/demo/index.html');
});