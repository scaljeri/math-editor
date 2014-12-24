// reload gulp: http://stackoverflow.com/questions/22886682/how-can-gulp-be-restarted-on-gulpfile-change
var argv = require('yargs').argv, // for args parsing
    spawn = require('child_process').spawn;

module.exports = function (gulp, $) {
    'use strict';

    gulp.task('default', function () {
        var p;

        gulp.watch(['gulpfile.js', 'tasks/*.js'], spawnChildren);

        spawnChildren();

        function spawnChildren(e) {
            // kill previous spawned process
            if (p) {
                p.kill();
            }

            // `spawn` a child `gulp` process linked to the parent `stdio`
            var args = ['serve'];
            if (argv.sourcemap !== undefined) {
                args.push('--sourcemap');
            }

            //p = spawn('gulp', ['serve'], {
            p = spawn('gulp', args, {
                stdio: 'inherit'
            });
        }
    });
};