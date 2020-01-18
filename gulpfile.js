"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var rename = require("gulp-rename");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
});

gulp.task("images", function() {           /* минификация jpeg,png и создание webp*/
   return gulp.src("build/img/**/*.{png,jpg,svg}") 
    .pipe(imagemin([
       imagemin.optipng({optimizationlevel: 3}),
       imagemin.jpegtran({progressive: true}),
   ]))
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img/"));
});

gulp.task("sprite", function() {              /*минификация svg и создание спрайта*/
    return gulp.src("source/img/svg/*.svg")
    .pipe(imagemin([
        imagemin.svgo()
    ]))
    .pipe(svgstore({
        inlineSvg: true
    }))
    
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
    return gulp.src("source/*.html")
    .pipe(posthtml([
        include()
    ]))
    
    .pipe(gulp.dest("build"));
});

gulp.task("minjs", function(){
 return gulp.src("build/js/*.js")
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
});

gulp.task("minhtml", function () {
  return gulp.src('build/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function (){
    return gulp.src([
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**",
        "source/img/**/*.ico"
    ], {
        base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
    return del("build")
});
    
gulp.task("server", function() {
    server.init({
        server: "build/"
    });

  gulp.watch("source/less/**/*.less", gulp.series("css", "refresh"));
  gulp.watch("source/img/**/*.{png,jpg,svg}", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
    server.reload();
    done();
});

/*gulp.task("build", gulp.series("clean", "copy", "css", "images", "sprite", "html", "minhtml", "minjs"));*/ /* clean copy css sprite html minjs?*/
gulp.task("build", gulp.series("clean", "copy", "css", "images", "sprite", "html", "minjs"));
gulp.task("start", gulp.series("build", "server"));
