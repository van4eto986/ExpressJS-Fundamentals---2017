var gulp = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');
let minifyHTML = require('gulp-minify-html-2');
let concat = require('gulp-concat');

gulp.task('scripts', function () {
    del.sync('build/**')

    return gulp.src([
        'bower_components/jquery/dist/core.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});



gulp.task('minify-html', function() {
    let opts = {comments:true, spare:true};

    return gulp.src(['views/status.html'])
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('build'))
})
