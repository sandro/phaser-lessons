var gulp = require("gulp");

var concat = require("gulp-concat");

gulp.task("default", function() {
  return gulp.src(["1.js", "game.js"])
    .pipe(concat("1.js"))
    .pipe(gulp.dest("build"));
});

gulp.watch('*.js', ["default"]);
