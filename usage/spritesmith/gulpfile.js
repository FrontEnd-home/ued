
// 引入 gulp
var gulp = require('gulp'); 

//雪碧图需要引用
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');

//????
var templater = require('spritesheet-templates');


var sprite_files = './test/ui/*/16.png',
    test_files = './test/icon/*.png',
    output_path = './public/';

// 雪碧图任务 合并icon图标
gulp.task('sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src(test_files)
      .pipe(spritesmith({
        imgName: 'icons.png',
        cssName: '_icons.scss',
        // 可选: 指定引擎 (auto, phantomjs, canvas, gm, pngsmith)
        //'engine': 'phantomjs',
        // 默认使用二叉树最优排列算法binary-tree
        // 可选算法：top-down  left-right  diagonal  alt-diagonal  binary-tree
        'algorithm': 'binary-tree',
        // 默认给雪碧图追加时间戳
        //'imagestamp': true,
        // 默认给样式文件追加时间戳
        //'cssstamp': true,
        //engine: phantomjssmith
        //cssSelector: function (item) { return 'selector'; },
        //cssTemplate: function (list) {
          
          // Convert items from an array into an object
          //var itemObj = {};
          //list.items.forEach(function (item) {
            // Grab the name and store the item under it
            //var name = item.name;
            //itemObj[name] = item;

            // Delete the name from the item
            //delete item.name;
          //});

          // Return stringified itemObj
          //return itemObj;
        //},
        cssTemplate: 'icon.scss.template.mustache',
        cssVarMap: function (item) {
          item.name = '' + item.name;
        }
      }));
  
  spriteData.pipe(gulp.dest(output_path+'images'));


  // Pipe image stream through image optimizer and onto disk
  // spriteData.img
  //   .pipe(imagemin())
  //   .pipe(gulp.dest(sprite_output_path+'/images/'));

  // // Pipe CSS stream through CSS optimizer and onto disk
  //spriteData.css
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
