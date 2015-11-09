var gulp        = require('gulp');
var gutil       = require('gulp-util');
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var watchify    = require('watchify');
var exorcist    = require('exorcist');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var src = {
    scss: 'app/scss/styles.scss',
    css:  'app/css/',
    html: 'app/*.html'
};

// Input file.
watchify.args.debug = true;
var bundler = watchify(browserify('./app/js/app.js', watchify.args));

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'app/js'
}));

// On updates recompile
//bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(exorcist('app/js/dist/bundle.js.map'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/js/dist'));
}

//Watching scss file changes
gulp.task('watch-sass', function () {
  return gulp.watch('app/scss/**/*.scss', ['sass']);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(src.css));
});



/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
    return bundle();
});

gulp.task('build', ['bundle', 'sass'], function(err){
    process.exit(err ? 1 : 0);
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['bundle', 'sass', 'watch-sass'], function () {
    browserSync.init({
        proxy: "http://localhost:8888",
        serveStatic: ['./app']
    });
});
