/* global require: true */

var del = require('del');

module.exports = function (gulp) {
    'use strict';

    gulp.task('clean', function (callback) {
        del('main.css', callback);
    });
};