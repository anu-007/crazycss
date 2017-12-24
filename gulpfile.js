var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('sass', () => {
  gulp.src('src/style.scss')
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(cleanCSS({format: 'beautify'}))
  .pipe(rename('crazy.css'))
  .pipe(gulp.dest('dist'))
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./src/*.scss',['styles']);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('*.css').on('change', browserSync.reload);
});

gulp.task('minify-css', () => {
  gulp.src('dist/crazy.css')
    .pipe(cleanCSS())
    .pipe(rename('crazy.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('collect', () => {
  gulp.src('src/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS({format: 'beautify'}))
    .pipe(gulp.dest('dist/components'));
});

gulp.task('default', ['sass', 'serve']);
gulp.task('build', ['collect', 'sass', 'minify-css']);
