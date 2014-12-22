/* global require: true */

var path = require('path');

module.exports = function (gulp, $) {
    'use strict';

    var lr,
        debug = require('gulp-debug'),
        connect = require('gulp-connect'),
        watch = require('gulp-watch'),
        livereload = require('gulp-livereload'),
        rename = require("gulp-rename"),
        path = require('path'),
        concat = require('gulp-concat');

    gulp.task('webserver', function () {
        connect.server({
            livereload: true,
            root: ['demo/']
        });
    });

    gulp.task('xlivereload', function () {
        /*
        gulp.watch(['demo/index.html', 'demo/custom-elements/** /*.html'], function(event) {
             connect.reload();
        });*/

        gulp.src(['demo/index.html', 'demo/custom-elements/**/*'])
            .pipe(watch(['demo/index.html', 'demo/custom-elements/**/*']))
            .pipe(debug({
                verbose: false
            }))
            .pipe(livereload());
        //.pipe(connect.reload());
    });

    gulp.task('watch', function () {
        livereload.listen();
        gulp.watch('resources/elements/**/*.scss', ['css']);
        gulp.watch('resources/scss/demo.scss', ['main-css']);

        gulp.watch([
                'index.html',
                'resources/elements/**/*.html'
            ], ['copy']);


        /*
        gulp.watch(['demo/index.html', 'demo/custom-elements/** /*.html'], function(event) {
            console.log("RELOAD");
             connect.reload();
        });*/

        gulp.watch('demo/custom-elements/**/*.css', function (event) {
            console.log("CHANGED FILE IS " + event.path);
            console.log(' ...path only=' + path.dirname(event.path));

            gulp.src(event.path)
                .pipe(concat('dummy.html'))
                .pipe(gulp.dest(path.dirname(event.path)));
        });

        gulp.src(['demo/index.html', 'demo/custom-elements/**/*'])
            .pipe(watch(['demo/index.html', 'demo/custom-elements/**/*']))
            /*.pipe(debug({
                verbose: false
            }))*/
            .pipe(livereload());
        //.pipe(connect.reload());

        /*
         gulp.src(['demo/index.html', 'demo/custom-elements/** /*.html'])
            .pipe(watch(['demo/index.html', 'demo/custom-elements/** /*.html']))
            .pipe(debug({
                verbose: false
            }))
            .pipe(connect.reload());
            */

        /*
        gulp.src(['demo/index.html', 'demo/custom-elements/** /*.html'])
            .pipe(connect.reload());*/
    });

    gulp.task('old-connect', function () {
        var connect = require('connect'),
            http = require('http'),
            livereload = require('connect-livereload'),
            livereloadPort = 35729,
            serveStatic = require('serve-static'),
            tinyLr = require('tiny-lr'),
            modrewrite = require('connect-modrewrite');

        var app = connect()
            .use(modrewrite(['!(\\.\\w+($|\\?)|\/docs) /index.html']))
            /* Livereload */
            .use(livereload({
                port: livereloadPort
            }))
            /* Mount app */
            .use(serveStatic('.'));

        var server = http.createServer(app);

        server.listen(3000, '0.0.0.0', function (err) {
            if (err) {
                $.util.log('Error on starting server:', $.util.colors.red(err));
            } else {
                $.util.log('Server started at', $.util.colors.green('http://0.0.0.0:3000'));

                lr = tinyLr();
                lr.listen(livereloadPort, function () {
                    $.util.log('LiveReload started on port', $.util.colors.green(livereloadPort));
                });
            }
        });
    });

    gulp.task('old-open', ['watch'], function () {
        require('open')('http://localhost:3000');
    });

    gulp.task('old-watch', ['copy', 'old-connect'], function () {
        gulp.watch([
                'index.html',
                'resources/elements/**/*.html'
            ], ['copy']);

        gulp.watch([
            'resources/**/*.scss'
        ], ['css']);

        gulp.watch(['demo/css/*.css'], function (event) {
            $.util.log('Reloading', $.util.colors.blue(path.relative('.', event.path)));
            var fileName = require('path').relative(__dirname, event.path);
            console.log("2OK, change " + event.path);
            lr.changed({
                body: {
                    files: [fileName] //event.path
                }
            });
        });
    });

};