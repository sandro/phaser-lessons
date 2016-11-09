var gulp = require("gulp");

var concat = require("gulp-concat");

gulp.task("one", function() {
  return gulp.src(["1.js", "game.js"])
    .pipe(concat("1.js"))
    .pipe(gulp.dest("build"));
})

gulp.task("two", function() {
  return gulp.src("2.js").pipe(gulp.dest("build"));
});

gulp.task("default", ["one", "two"]);

gulp.watch('*.js', ["default"]);
