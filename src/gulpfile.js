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

gulp.task("three", function() {
  return gulp.src("3.js").pipe(gulp.dest("build"));
});

gulp.task("default", ["one", "two", "three"]);

gulp.watch('*.js', ["default"]);
