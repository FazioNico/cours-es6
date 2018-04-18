var gulp = require('gulp')
var babel = require('gulp-babel');
var babelify = require('babelify');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var removeHtmlComments  = require('gulp-remove-html-comments');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Config of project folders
var config = {
  desDir: './dist' /* répértoire de destination (prod) */
}
// Task to build JS files
gulp.task("build-js", function(){
  return browserify("dev/app/app.js",{
     debug: true
   })
   .transform(babelify.configure({
     presets : ["es2015"]
   }))
   .bundle()
   .pipe(source("bundle.js"))
   .pipe(gulp.dest(config.desDir + '/js'))
   .pipe(reload({stream:true}));
});

gulp.task("copy-dependencies", function(){
  return gulp.src(['./node_modules/jquery/dist/jquery.min.js',])
  .pipe(concat('vendors.js'))
  //.pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(config.desDir+ '/js'))
});

gulp.task("copy-html", function(){
  return gulp.src(['./dev/www/*.html'])
  .pipe(removeHtmlComments())
  .pipe(gulp.dest(config.desDir))
  .pipe(reload({stream:true}));
});

gulp.task("copy-css", function(){
  return gulp.src(['./dev/src/**/*.css'])
  .pipe(gulp.dest(config.desDir))
  .pipe(reload({stream:true}));
});

gulp.task("copy-img", function(){
  return gulp.src(['./dev/src/**/*.jpg', './dev/src/**/*.png'])
  .pipe(gulp.dest(config.desDir))
  .pipe(reload({stream:true}));
});


// Task to run local server
gulp.task("startServer",  function() {
  browserSync.init({
    server: {
        baseDir: config.desDir
    },
    notify: true
  });
});

// Task to watch wich file is changing
// and load the right task
gulp.task('watch', function() {
  // watch js file changes
  gulp.watch('./dev/app/**/*.js', ['build-js']); 
  // watch all html template file changes
  gulp.watch('./dev/**/*.html', ['copy-html']); 
  // watch all css file changes
  gulp.watch('./dev/**/*.css', ['copy-css']); 
});

gulp.task('run', [
  'build-js',
  'copy-html',
  'copy-css',
  'copy-img',
  'copy-dependencies'
])

gulp.task('default', ['run'], function(){
  gulp.start('startServer', 'watch')
})
