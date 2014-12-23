module.exports = function (gulp, $) {
    'use strict';

    gulp.task('copy', function () {
        var target = 'demo/';

        gulp.src('index.html')
            .pipe(gulp.dest(target));

        gulp.src('resources/elements/demo-app/*')
            .pipe(gulp.dest(target + 'custom-elements/demo-app/'));

        gulp.src('resources/elements/matrix-canvas/*')
            .pipe(gulp.dest(target + 'custom-elements/matrix-canvas/'));

        gulp.src('resources/elements/glitch-effect/*')
            .pipe(gulp.dest(target + 'custom-elements/glitch-effect/'));

        gulp.src('resources/fonts/*')
            .pipe(gulp.dest(target + 'css/fonts/'));
    });
};