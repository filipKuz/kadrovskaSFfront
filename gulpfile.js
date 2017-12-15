var gulp = require('gulp');
var bs = require('browser-sync').create(); // create a browser sync instance.

var webserver = require("gulp-webserver")    
gulp.task('webserver', function(){
    return gulp
        .src([paths.distDevelopFolder])
        .pipe(webserver({
            port: 3000,
            livereload: true,
            open: 'http://localhost:3000',
            proxies: [
                {
                    source: '/api', target: 'http://localhost:8080/api'
                }
            ]
        }));
    });