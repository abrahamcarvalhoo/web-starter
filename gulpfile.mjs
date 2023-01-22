import gulp from 'gulp'
const { src, dest, watch, series, parallel } = gulp
import { deleteAsync } from 'del'
import pug from 'gulp-pug'
import gif from 'gulp-if'
import data from 'gulp-data'
import concat from 'gulp-concat'
import include from 'gulp-include'
import plumber from 'gulp-plumber'
import changedInPlace from 'gulp-changed-in-place'
const changed = () => changedInPlace({ firstPass: true })
import sourcemaps from 'gulp-sourcemaps'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import postcss from 'gulp-postcss'
import mqpacker from 'css-mqpacker'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import uglify from 'gulp-uglify'
import imagemin from 'gulp-imagemin'
import browsersync from 'browser-sync'
import config from './config.json' assert { type: 'json' }
browsersync.create()

let IS_PROD = false

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
  return src([`${source.views}/**/!(_)*.pug`])
  .pipe(plumber())
  .pipe(data(file => Object.assign(config, { IS_PROD })))
  .pipe(pug({ basedir: source.views, pretty: true }))
  .pipe(changed())
  .pipe(dest(dist.path))
  .pipe(browsersync.stream())
}

function styles() {
  return src([`${source.styles}/app.sass`, `${source.styles}/vendors.sass`])
  .pipe(plumber())
  .pipe(gif(!IS_PROD, sourcemaps.init()))
  .pipe(sass({ includePaths: [source.styles, 'node_modules'] }).on('error', sass.logError))
  .pipe(postcss([mqpacker({ sort: true }), autoprefixer()]))
  .pipe(gif(IS_PROD, postcss([cssnano()])))
  .pipe(gif(IS_PROD, concat('app.min.css')))
  .pipe(gif(!IS_PROD, sourcemaps.write()))
  .pipe(dest(dist.styles))
  .pipe(browsersync.stream())
}

function scripts() {
  return src(`${source.scripts}/*.js`)
  .pipe(plumber())
  .pipe(gif(!IS_PROD, sourcemaps.init()))
  .pipe(include({ includePaths: [source.scripts, 'node_modules'] }))
  .pipe(gif(IS_PROD, uglify()))
  .pipe(gif(IS_PROD, concat('app.min.js')))
  .pipe(gif(!IS_PROD, sourcemaps.write()))
  .pipe(dest(dist.scripts))
  .pipe(browsersync.stream())
}

function images() {
  return src(`${source.images}/**/*.{png,jpg,gif,svg}`)
  .pipe(plumber())
  .pipe(changed())
  .pipe(gif(IS_PROD, imagemin()))
  .pipe(dest(dist.images))
  .pipe(browsersync.stream())
}

function fonts() {
  return src(`${source.fonts}/**/*.{otf,ttf,eot,woff,woff2,svg}`)
  .pipe(plumber())
  .pipe(changed())
  .pipe(dest(dist.fonts))
  .pipe(browsersync.stream())
}

function publics() {
  return src(`${source.publics}/**/*`)
  .pipe(plumber())
  .pipe(changed())
  .pipe(dest(dist.path))
  .pipe(browsersync.stream())
}

function watcher() {
  browsersync.init({ server: dist.path, notify: false })
  watch(`${source.views}/**/*.pug`, views)
  watch(`${source.styles}/**/*.sass`, styles)
  watch(`${source.scripts}/**/*.js`, scripts)
  watch(`${source.images}/**/*.{png,jpg,gif,svg}`, images)
  watch(`${source.fonts}/**/*.{otf,ttf,eot,woff,woff2,svg}`, fonts)
  watch(`${source.publics}/**/*`, publics)
}

const setPROD = done => (IS_PROD = true, done())
export const clean = () => deleteAsync(dist.path)
export const tasks = series(clean, parallel(views, styles, scripts, images, fonts, publics))
export const build = series(setPROD, tasks)
export default series(tasks, watcher)
