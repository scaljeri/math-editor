/* global require: true */
var gulpif = require('gulp-if'),
    fs = require('fs'),
    path = require('path'),
    print = require('gulp-print');

module.exports = function (gulp, $) {
    'use strict';

    return {
        'scss2css': function (file, outputDir, config) {
            var cssFilter = $.filter(['*.css']),

                processors = [
                        require('autoprefixer-core')({
                        browsers: ['last 2 versions']
                    }),
                        require('css-mqpacker') // https://github.com/hail2u/node-css-mqpacker
                        //require('csswring')   // https://github.com/hail2u/node-csswring
                    ];

            return gulp.src(file)
                .pipe(gulpif(config.sourceMap === true, $.sourcemaps.init()))
                .pipe($.sass({
                    errLogToConsole: true
                }))
                .pipe(gulpif(config.sourceMap === true, $.sourcemaps.write({
                    includeContent: false
                })), $.sourcemaps.init({
                    loadMaps: true
                }))
                .pipe($.postcss(processors))
                .pipe(gulpif(config.sourceMap === true, $.sourcemaps.write('.')))
                .pipe(cssFilter)
                .pipe(cssFilter.restore())
                .pipe($.size({
                    showFiles: true
                }))
                .pipe(gulp.dest(outputDir))
        },
        getFolders: function (dir) {
            return fs.readdirSync(dir)
                .filter(function (file) {
                    return fs.statSync(path.join(dir, file)).isDirectory();
                });
        }
    };
};