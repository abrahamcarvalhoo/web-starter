"use strict"

/**
 * Dependencies
 * -----------------------------------------------------------------------------
 */

var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var browserSync = require("browser-sync");
var sequence = require("run-sequence");
var del = require("del");

/**
 * Set variables
 * -----------------------------------------------------------------------------
 */

var paths = {
  build: "./build/",
  source: "./source/",
  vendors: "./vendors/",
  views: "views/",
  public: "public/",
  fonts: "assets/fonts/",
  images: "assets/images/",
  styles: "assets/stylesheets/",
  scripts: "assets/javascripts/"
};

var prefixes = [
  "ie >= 10",
  "ie_mob >= 10",
  "ff >= 30",
  "chrome >= 34",
  "safari >= 7",
  "opera >= 23",
  "ios >= 7",
  "android >= 4.4",
  "bb >= 10"
];

var onError = function (error) {
  plugins.notify.onError({
    title: "Gulp",
    subtitle: "Failure!",
    message: "Error: (<%= error.plugin %>) <%= error.message %>",
    sound: "Beep"
  })(error);
  this.emit("end");
};

/**
 * Default task
 * -----------------------------------------------------------------------------
 */

gulp.task("default", function (callback) {
  return sequence(["build"], ["server"], callback);
});

/**
 * Local dev server with live reload
 * -----------------------------------------------------------------------------
 */

gulp.task("server", function () {
  // Create and initialize local server
  browserSync.create();
  browserSync.init({
    ui: false,
    port: 3000,
    notify: false,
    server: paths.build,
    open: "local"
  });
  // Watch for build changes and reload browser
  browserSync.watch(paths.build + "**/*").on("change", browserSync.reload);
  // Watch for source changes and execute associated tasks
  gulp.watch(paths.source + paths.views + "**/*.pug", ["views"]);
  gulp.watch(paths.source + paths.public + "**/*", ["public"]);
  gulp.watch(paths.source + paths.fonts + "**/*", ["fonts"]);
  gulp.watch(paths.source + paths.images + "**/*", ["images"]);
  gulp.watch(paths.source + paths.styles + "**/*.sass", ["styles"]);
  gulp.watch(paths.source + paths.scripts + "**/*.js", ["scripts"]);
});

/**
 * Build static assets
 * -----------------------------------------------------------------------------
 */

gulp.task("build", function (callback) {
  return sequence(["clean"], ["assets"], ["scripts"], ["styles"], ["views"], callback);
});

/**
 * Remove build directory
 * -----------------------------------------------------------------------------
 */

gulp.task("clean", function () {
  return del(paths.build);
});

/**
 * Assets
 * -----------------------------------------------------------------------------
 */

gulp.task("assets", function (callback) {
  return sequence(["public"], ["fonts"], ["images"], callback);
});

/**
 * Copy public files
 * -----------------------------------------------------------------------------
 */

gulp.task("public", function () {
  return gulp
  // Select files
  .src(paths.source + paths.public + "**/*")
  // Catch stream errors
  .pipe(plugins.plumber({errorHandler: onError}))
  // Check for changes
  .pipe(plugins.changed(paths.build))
  // Save files
  .pipe(gulp.dest(paths.build));
});

/**
 * Copy font files
 * -----------------------------------------------------------------------------
 */

gulp.task("fonts", function () {
  return gulp
  // Select files
  .src(paths.source + paths.fonts + "**/*")
  // Catch stream errors
  .pipe(plugins.plumber({errorHandler: onError}))
  // Check for changes
  .pipe(plugins.changed(paths.build + paths.fonts))
  // Save files
  .pipe(gulp.dest(paths.build + paths.fonts));
});

/**
 * Copy image files
 * -----------------------------------------------------------------------------
 */

gulp.task("images", function () {
  return gulp
  // Select files
  .src(paths.source + paths.images + "**/*")
  // Catch stream errors
  .pipe(plugins.plumber({errorHandler: onError}))
  // Check for changes
  .pipe(plugins.changed(paths.build + paths.images))
  // Save files
  .pipe(gulp.dest(paths.build + paths.images));
});

/**
 * Build scripts
 * -----------------------------------------------------------------------------
 */

gulp.task("scripts", function () {
  return gulp
  // Select files
  .src(paths.source + paths.scripts + "*.js")
  // Catch stream errors
  .pipe(plugins.plumber({errorHandler: onError}))
  // Concatenate includes
  .pipe(plugins.include({
    includePaths: [__dirname + "/" + paths.vendors, __dirname + "/" + paths.source + paths.scripts]
  }))
  // Save unminified file
  .pipe(gulp.dest(paths.build + paths.scripts))
  // Optimize and minify
  .pipe(plugins.uglify())
  // Append suffix
  .pipe(plugins.rename({suffix: ".min"}))
  // Save minified file
  .pipe(gulp.dest(paths.build + paths.scripts));
});

/**
 * Build styles with pre-processors
 * -----------------------------------------------------------------------------
 */

gulp.task("styles", function () {
  return gulp
  // Select files
  .src(paths.source + paths.styles + "*.sass")
  // Catch stream errors
  .pipe(plugins.plumber({errorHandler: onError}))
  // Compile Sass
  .pipe(plugins.sass({
    includePaths: [__dirname + "/" + paths.vendors, __dirname + "/" + paths.source + paths.styles],
    outputStyle: "expanded"
  }))
  // Add vendor prefixes
  .pipe(plugins.autoprefixer(prefixes, {cascade: true}))
  // Save unminified file
  .pipe(gulp.dest(paths.build + paths.styles))
  // Optimize and minify
  .pipe(plugins.cleanCss())
  // Append suffix
  .pipe(plugins.rename({suffix: ".min"}))
  // Save minified file
  .pipe(gulp.dest(paths.build + paths.styles));
});

/**
 * Build views with pre-processors
 * -----------------------------------------------------------------------------
 */

gulp.task("views", function () {
  return gulp
  // Select files
  .src(paths.source + paths.views + "*.pug")
  // Catch stream errors
  .pipe(plugins.plumber({errorHandler: onError}))
  // Get data file
  .pipe(plugins.data(function (file) {
    var dataJSON = require(paths.source + "config.json");
    return dataJSON;
  }))
  // Compile Pug
  .pipe(plugins.pug({
    basedir: __dirname + "/" + paths.source + paths.views,
    pretty: true
  }))
  // Save files
  .pipe(gulp.dest(paths.build));
});
