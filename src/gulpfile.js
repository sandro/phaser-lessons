var gulp = require("gulp");

var concat = require("gulp-concat");
var connect = require("gulp-connect");

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

gulp.task("four", function() {
  return gulp.src("4.js").pipe(gulp.dest("build"));
});

gulp.task("compile", ["one", "two", "three", "four"]);

gulp.task("watch", function() {
  gulp.watch('*.js', ["compile"]);
});

gulp.task('webserver', function() {
  connect.server();
});

gulp.task("default", ["compile", "webserver", "watch"]);
