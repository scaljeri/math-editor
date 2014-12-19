module.exports = function (gulp, $) {
    'use strict';

    gulp.task('bootstrap', function () {
        var target = 'target/css';

        gulp.src('scss/bootstrap.scss')
            .pipe($.sass({
                errLogToConsole: true
            }))
            .pipe($.size({
                showFiles: true
            }))
            .pipe(gulp.dest(target));
    });
};