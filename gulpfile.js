const { src, dest, watch, series, parallel } = require('gulp'),
del = require('del'),
pug = require('gulp-pug'),
data = require('gulp-data'),
include = require('gulp-include'),
sourcemaps = require('gulp-sourcemaps'),
sass = require('gulp-sass')(require('sass')),
autoprefixer = require('autoprefixer'),
postcss = require('gulp-postcss'),
cssnano = require('cssnano'),
mqpacker = require('css-mqpacker'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
browsersync = require('browser-sync').create()

const IS_PROD = process.env.NODE_ENV === 'production'

const source = {
  path: 'src',
  views: 'src/views',
  styles: 'src/styles',
  scripts: 'src/scripts',
  images: 'src/images',
  fonts: 'src/fonts',
  public: 'src/public',
  config: 'config.json'
}

const dist = {
  path: 'dist',
  styles: 'dist/assets/styles',
  scripts: 'dist/assets/scripts',
  images: 'dist/assets/images',
  fonts: 'dist/assets/fonts'
}


function views() {
  return src('${source.views}/*.pug')
  .pipe(data(function(file) {
    return require(source.config)
  }))
  .pipe(pug())
  .pipe(dest(dist.path))
}

function styles() {
  return src('${source.styles}/*.sass')
  .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
  .pipe(sourcemaps.init())
  .pipe(postcss([autoprefixer(), mqpacker({sort: true}), cssnano()]))
  .pipe(sourcemaps.write())
  .pipe(dest(dist.styles))
  .pipe(browsersync.stream())
}

function scripts() {
  return src('${source.scripts}/*.js')
  .pipe(include({includePaths: ['node_modules']}))
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(dest(dist.scripts))
  .pipe(browsersync.stream())
}

function images() {
  return src('${source.images}/**/*')
  .pipe(dest(dist.images))
  .pipe(browsersync.stream())
}

function fonts() {
  return src('${source.fonts}/**/*')
  .pipe(dest(dist.fonts))
  .pipe(browsersync.stream())
}

function public() {
  return src('${source.public}/**/*')
  .pipe(dest(dist))
  .pipe(browsersync.stream())
}

function clean() {
	return del(dist.path)
}

function watch() {
  browsersync.init({
    ui: false,
    port: 3000,
    notify: false,
    server: dist.path
  })

  watch('${source.views}/**/*', views)
  watch('${source.styles}/**/*', styles)
  watch('${source.scripts}/**/*', scripts)
  watch('${source.images}/**/*', images)
  watch('${source.fonts}/**/*', fonts)
  watch('${source.public}/**/*', public)
  watch('${dist.path}/**/*.html').on('change', browsersync.reload)
}

function build() {
	return series(clean, parallel(views, styles, scripts, images, fonts, public))
}

exports.build	= build
exports.default	= series(build, watch)
