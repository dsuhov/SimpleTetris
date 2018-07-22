const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const babel = require('gulp-babel');

gulp.task('build', () => {
  return gulp.src('js/game.js')
  .pipe(rollup({
    format: 'iife',
    file: 'main.js'
  }))
  .pipe(babel())
  .pipe(gulp.dest('./'))
});