module.exports = function (gulp, $) {
    'use strict';

    var getFolders = require('./utils')(gulp, $).getFolders;

    gulp.task('copy', function () {
        gulp.src('index.html')
            .pipe(gulp.dest('demo/'));

        gulp.src('resources/fonts/*')
            .pipe(gulp.dest('demo/css/fonts/'));

        // images
        gulp.src('resources/images/*')
            .pipe(gulp.dest('demo/images/'));

        getFolders('resources/elements/').map(function (element) {
            gulp.src(['resources/elements/' + element + '/**',            // select everything
                      '!resources/elements/' + element + '/**/*.scss'])   // but exclude scss files
                .pipe(gulp.dest('demo/custom-elements/' + element));
        });

    });
};