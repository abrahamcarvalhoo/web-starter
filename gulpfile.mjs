import gulp from 'gulp'
const { series, parallel, watch, src, dest } = gulp
import { deleteAsync } from 'del'
import pug from 'gulp-pug'
import data from 'gulp-data'
import include from 'gulp-include'
import sourcemaps from 'gulp-sourcemaps'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import mqpacker from 'css-mqpacker'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import browsersync from 'browser-sync'
import config from './config.json' assert { type: 'json' }
browsersync.create()

const IS_PROD = process.env.NODE_ENV === 'production'

const source = {
  path: 'src',
  views: 'src/views',
  styles: 'src/styles',
  scripts: 'src/scripts',
  images: 'src/images',
  fonts: 'src/fonts',
  publics: 'src/public',
}

const dist = {
  path: 'dist',
  styles: 'dist/assets/styles',
  scripts: 'dist/assets/scripts',
  images: 'dist/assets/images',
  fonts: 'dist/assets/fonts'
}

function views() {
  return src(`${source.views}/*.pug`)
  .pipe(data(file => config))
  .pipe(pug())
  .pipe(dest(dist.path))
  .pipe(browsersync.stream())
}

function styles() {
  return src(`${source.styles}/*.sass`)
  .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
  .pipe(sourcemaps.init())
  .pipe(postcss([
    autoprefixer(),
    mqpacker({ sort: true }),
    cssnano()
  ]))
  .pipe(sourcemaps.write())
  .pipe(dest(dist.styles))
  .pipe(browsersync.stream())
}

function scripts() {
  return src(`${source.scripts}/*.js`)
  .pipe(include({ includePaths: ['node_modules'] }))
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(dest(dist.scripts))
  .pipe(browsersync.stream())
}

function images() {
  return src(`${source.images}/**/*`)
  .pipe(dest(dist.images))
  .pipe(browsersync.stream())
}

function fonts() {
  return src(`${source.fonts}/**/*`)
  .pipe(dest(dist.fonts))
  .pipe(browsersync.stream())
}

function publics() {
  return src(`${source.publics}/**/*`)
  .pipe(dest(dist.path))
  .pipe(browsersync.stream())
}

const clean = () => deleteAsync(dist.path)

function watcher() {
  browsersync.init({ server: dist.path })

  watch(`${source.views}/**/*`, views)
  watch(`${source.styles}/**/*`, styles)
  watch(`${source.scripts}/**/*`, scripts)
  watch(`${source.images}/**/*`, images)
  watch(`${source.fonts}/**/*`, fonts)
  watch(`${source.publics}/**/*`, publics)
}

export const build = series(clean, parallel(views, styles, scripts, images, fonts, publics))
export default series(build, watcher)
