/* global require: true */

var path = require('path');

module.exports = function (gulp, $) {
    'use strict';

    var connect = require('gulp-connect'),
        watch = require('gulp-watch'),
        livereload = require('gulp-livereload'),
        path = require('path'),
        concat = require('gulp-concat');

    gulp.task('webserver', function () {
        connect.server({
            livereload: true,
            root: ['demo/']
        });
    });

    gulp.task('watch', function () {
        livereload.listen();

        gulp.watch(['resources/elements/**/*.scss'], ['css']);
        gulp.watch('resources/scss/demo.scss', ['main-css']);

        gulp.watch([
                'index.html',
                'resources/elements/**/*.html'
            ], ['copy']);

        // Create dummy html file to fore livereload to reload the page
        /*
        gulp.watch('demo/custom-elements/** /*.css', function (event) {
            gulp.src(event.path)
                .pipe(concat('dummy.html'))
                .pipe(gulp.dest(path.dirname(event.path)));
        });*/

        gulp.src(['demo/index.html'])//, 'demo/custom-elements/**/*'])
            .pipe(watch(['demo/index.html']))//, 'demo/custom-elements/**/*']))
            .pipe(livereload());
    });
};