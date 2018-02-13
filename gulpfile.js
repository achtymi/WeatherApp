'use strict';

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const gulp = require('gulp');
const htmlMin = require('gulp-htmlmin');
const less = require('gulp-less');
const merge = require('merge-stream');
const open = require('gulp-open');
const path = require('path');
const Server = require('karma').Server;
const uglify = require('gulp-uglify');
const uglifyCss = require('gulp-uglifycss');

const config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: [
      './app/*.html',
      './app/**/*.html',
      './app/**/**/*.html',
    ],
    css: [
      'node_modules/reset-css/reset.css'
    ],
    less: [
      './app/styles/*.less',
      './app/**/*.less',
      './app/**/**/*.less'
    ],
    js: {
      vendor: [
        'node_modules/angular/angular.min.js',
        'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js'
      ],
      app: [
        './app/*.js',
        './app/**/*.js',
        '!./app/**/*.spec.js'
      ]
    },
    images: './app/images/**/*',
    dist: './dist'
  }
};

gulp.task('connect', () => {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], () => {
  gulp.src('dist/index.html')
    .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', () => {
  gulp.src(config.paths.html)
    .pipe(htmlMin({collapseWhitespace:true}))
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('css', () => {
  let cssStream = gulp.src(config.paths.css)
    .pipe(concat('bundle.css'));

  let lessStream = gulp.src(config.paths.less)
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }));

  return merge(cssStream, lessStream)
    .pipe(uglifyCss())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
    .pipe(connect.reload());
});

gulp.task('vendorJs', () => {
  gulp.src(config.paths.js.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.paths.dist + '/js'))
    .pipe(connect.reload());
});

gulp.task('appJs', () => {
  gulp.src(config.paths.js.app)
    .pipe(concat('script.js'))
    .pipe(babel({
        presets: ['env']
    }))
    //.pipe(uglify())
    .pipe(gulp.dest(config.paths.dist + '/js'))
    .pipe(connect.reload());
});

gulp.task('images', () => {
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());
});

gulp.task('test', done => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});

gulp.task('watch', () => {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.css, ['css']);
  gulp.watch(config.paths.less, ['css']);
  gulp.watch(config.paths.js.vendor, ['vendorJs']);
  gulp.watch(config.paths.js.app, ['appJs']);
  gulp.watch(config.paths.images, ['images']);
});

gulp.task('default', ['html', 'css', 'vendorJs', 'appJs', 'images', 'open', 'watch']);
gulp.task('withTest', ['html', 'css', 'vendorJs', 'appJs', 'images', 'open', 'test', 'watch']);