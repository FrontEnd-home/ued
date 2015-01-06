
// 引入 gulp
var gulp = require('gulp'); 

//雪碧图需要引用
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');

//????
var templater = require('spritesheet-templates');


var sprite_files = './test/ui/'
    sprite_output_path = './public/';

// 雪碧图任务 合并icon图标
gulp.task('sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src(sprite_files+'*/16.png')
      .pipe(spritesmith({
        imgName: 'icons.png',
        cssName: '_icons.css',
        //engine: phantomjssmith
        cssSelector: function (item) { return 'selector'; },
        //cssTemplate: 'scss.template.mustache',
        cssVarMap: function (item) {
          item.name = 'sprite_' + item.name;
        }
      }));
  
  spriteData.pipe(gulp.dest(sprite_output_path+'images'));


  // Pipe image stream through image optimizer and onto disk
  // spriteData.img
  //   .pipe(imagemin())
  //   .pipe(gulp.dest(sprite_output_path+'/images/'));

  // // Pipe CSS stream through CSS optimizer and onto disk
  // spriteData.css
  //   .pipe(csso())
  //   .pipe(gulp.dest(sprite_output_path+'/css/'));

});


// 默认任务
// gulp.task('default', function(){
//     gulp.run('sprite');

//     // 监听文件变化
//     // gulp.watch('./js/*.js', function(){
//     //     gulp.run('lint', 'sass', 'scripts');
//     // });
// });