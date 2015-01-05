var gulp = require('gulp');
var fs = require('fs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssBase64 = require('gulp-css-base64');
var cssmin = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');

var header = require('gulp-header');
var footer = require('gulp-footer');
var buildConfig = require('./build.config.js');

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var watch = require('gulp-watch');

var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var open = require('gulp-open');
var port = 35729;
var webPort = 9000;
/**
*gulp js dev | build
**/
var env = '';
switch(process.argv[3]){
  case '--dev':env = 'dev'; break;
  case '--build':env = 'build'; break;
}
var static_sass = './css/sass/root.scss',
    sass_files = './css/sass/*.scss',
    static_css = './css/',
    static_icon = './res/icons',
    static_fonts = './res/fonts',
    static_res = './res',
    static_js = './js/',    
    static_js_view = './js/views/*.js',
    static_js_module = './js/modules/*.js',
    static_js_controller = './js/controller/*.js',
    static_html = './html/*.html',
    indexPage = './html/index.html';

gulp.task('css',function(){   
  gulp.src(static_sass)
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(cssBase64({
    baseDir:static_icon,
    maxWeightResource:40,
    extensionsAllowed:['.png','.svg','.jpg','.gif']
  }))
  .on('error',function(err){
    console.log(err.toString());
  })
  .pipe(gulpif(env=='build',cssmin()))
  .pipe(gulpif(env=='build',rename('common.min.js')))
  .pipe(gulp.dest(static_css));
});


gulp.task('fonts',function(){
  gulp.src(static_res+'/*.svg') 
  .pipe(iconfontCss({
      fontName: 'nbBrain',
      path: './css/sass/_fonts.scss',
      targetPath: './css/_fonts.css',
      fontPath: static_fonts
  })) 
  .pipe(iconfont({
    fontName:'nbBrain'
  }))
  .on('codepoints',function(codepoints,options){
    console.log(codepoints,options);
  })
  .pipe(gulp.dest(static_fonts));
});

gulp.task('libs',function(){
  gulp.src(buildConfig.static_js_common)
  .pipe(jshint())
  .pipe(concat('libs.js'))
  .pipe(header(buildConfig.closureStart))
  .pipe(footer(buildConfig.closureEnd))
  .pipe(gulpif(env=='build',uglify()))
  .pipe(gulpif(env=='build',rename('libs.min.js')))
  .pipe(gulp.dest(static_js));
});

gulp.task('js',function(){
  gulp.src([static_js_module,static_js_controller,static_js_view])
  .pipe(jshint())
  .pipe(concat('main.js'))
  .pipe(header(buildConfig.closureStart))
  .pipe(footer(buildConfig.closureEnd))
  .pipe(gulpif(env=='build',uglify()))
  .pipe(gulpif(env=='build',rename('main.min.js')))
  .pipe(gulp.dest(static_js));
});

//HTTP服务
var fileHtml = 'index.html';
gulp.task('web',function(){
  var option = {
    url:'http://localhost:'+webPort+'/'+fileHtml,
    app:'chrome'
  }  
  connect.server({
    livereload:true,
    port:webPort
  });
  gulp.src(fileHtml)
  .pipe(open('',option))
});

//watch
gulp.task('watch',function(){
  gulp.src([sass_files,static_html])
  .pipe(connect.reload());
})

gulp.task('start',['web','watch']);


gulp.task('default',['css','common','js']);

function errorHandler(err){
  console.log(err.toString());
  this.emit('end');
}