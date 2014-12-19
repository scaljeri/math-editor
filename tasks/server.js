/* global require: true */

var path = require('path');

module.exports = function (gulp, $) {
    'use strict';

    var lr;

    gulp.task('connect', function () {
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
                $.util.log('Server started at', $.util.colors.green('http://0.0.0.0:9090'));

                lr = tinyLr();
                lr.listen(livereloadPort, function () {
                    $.util.log('LiveReload started on port', $.util.colors.green(livereloadPort));
                });
            }
        });
    });

    gulp.task('watch', ['bootstrap', 'css', 'connect'], function () {
        gulp.watch([
            'index.html',
            'js/**/*.js',
            'images/**/*',
            'target/css/main.css'
        ], function (event) {
            $.util.log('Reloading', $.util.colors.blue(path.relative('.', event.path)));
            lr.changed({
                body: {
                    files: event.path
                }
            });
        });

        gulp.watch([
            'scss/**/*.scss'
        ], ['css']);
    });
};