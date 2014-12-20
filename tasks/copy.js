module.exports = function (gulp, $) {
    'use strict';

    gulp.task('copy', function () {
        var target = 'demo/';

        gulp.src('index.html')
            .pipe(gulp.dest(target));

        gulp.src('bower_components/normalize.css/normalize.css')
            .pipe(gulp.dest(target + 'css/'));

        gulp.src('resources/elements/*')
            .pipe(gulp.dest(target + 'polymer-elements/'));
    });
};