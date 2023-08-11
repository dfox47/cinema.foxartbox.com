// npm install -g gulp-cli
// npm install gulp vinyl-ftp gulp-util --save-dev

const fs            = require('fs')
const concat        = require('gulp-concat')
const config        = JSON.parse(fs.readFileSync('../config.json'))
const cssMinify     = require('gulp-csso')
const ftp           = require('vinyl-ftp')
const gulp          = require('gulp')
const gutil         = require('gulp-util')
const rename        = require('gulp-rename')
const sass          = require('gulp-sass')(require('sass'))
const uglify        = require('gulp-uglify')

// FTP config
const host            = config.host
const password        = config.password
const port            = config.port
const user            = config.user

const remoteFolder          = '/gnezdo.foxartbox.com/public_html/'
const remoteCss             = remoteFolder + 'css/'
const remoteJs              = remoteFolder + 'js/'
const remoteTemplateParts   = remoteFolder + 'template-parts/'

const localFolder           = ''
const localCss              = localFolder + 'css/'
const localJs               = localFolder + 'js/'
const localTemplateParts    = localFolder + 'template-parts/'

function getFtpConnection() {
	return ftp.create({
		host:           host,
		log:            gutil.log,
		password:       password,
		parallel:       3,
		port:           port,
		timeout:        99999999,
		user:           user
	});
}

const conn = getFtpConnection()



gulp.task('css', function () {
	return gulp.src(localCss + 'styles.scss')
		.pipe(sass())
		.pipe(cssMinify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(conn.dest(remoteFolder))
})

gulp.task('copy_css', function () {
	return gulp.src(localCss + '**/*')
		.pipe(conn.dest(remoteCss))
})

gulp.task('copy_html', function () {
	return gulp.src(localFolder + '*.php')
		.pipe(conn.dest(remoteFolder))
})

gulp.task('js', function () {
	return gulp.src([
		localJs + 'jquery-3.7.0.min.js',
		localJs + 'owl.carousel.js',
		localJs + '*.js'
	])
		.pipe(concat('all.js'))
		// .pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(conn.dest(remoteFolder))
})

gulp.task('js_copy', function () {
	return gulp.src(localJs + '**/*.js')
		.pipe(conn.dest(remoteJs))
})

gulp.task('template_parts_copy', function () {
	return gulp.src(localTemplateParts + '**/*')
		.pipe(conn.dest(remoteTemplateParts))
})

gulp.task('watch', function() {
	gulp.watch(localCss + '**/*',             gulp.series('css', 'copy_css'))
	gulp.watch(localFolder + '*.php',         gulp.series('copy_html'))
	gulp.watch(localJs + '**/*.js',           gulp.series('js', 'js_copy'))
	gulp.watch(localTemplateParts + '**/*',   gulp.series('template_parts_copy'))
})

gulp.task('default', gulp.series('watch'))