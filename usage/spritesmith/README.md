使用Spritesmith生成高清雪碧图及样式
===================================

[使用Spritesmith生成高清雪碧图及样式](http://www.solodu.com/generate-retina-css-sprite-with-spritesmith/)

如果不使用工具,完全人工合并雪碧图的话无疑是一件浪费时间也很无聊的事情.关于合并雪碧图的工具也是层出不穷,但一直觉得不太顺手好用,直到出现了Spritesmith,一站式解决样式,图片,高清图等所有问题,为流程的自动化画上了浓墨重彩的一笔...

- Github地址: [spritesmith](https://github.com/Ensighten/spritesmith)

对应Grunt和Gulp的插件地址分别是

- [Grunt插件](https://github.com/Ensighten/grunt-spritesmith)
- [Gulp插件](https://github.com/twolfson/gulp.spritesmith)

可根据流程选择所需的版本,下面以Grunt为例

##安装

安装前需要先了解下对运行环境的要求,因为可以选择`pngsmith`,`phantomjs`,`canvas`,`gm` (`Graphics Magick` / `Image Magick`)不同的引擎来进行雪碧图的合并输出,所以要提前准备好,以免安装过程中报错

不过既然提到了这么多种引擎,那么就先来了解下不同引擎的差异

- pngsmith
  - 优点: 不需要额外的安装
  - 缺点: 只能合并png格式的图片
- phantomjs
  - 优点: 安装简单,并且支持所有图片格式
  - 缺点: 需要先在系统里安装好phantomjs
- canvas
  - 优点: 在100个图以上的测试中性能最好
  - 缺点: 安装依赖过多,使用node-canvas,node-canvas依赖Cairo,还需要安装node-gyp
- gm
  - 优点: 配置丰富,可以选择图片输出质量
  - 缺点: 安装依赖过多,需要系统里安装好 Graphics Magick 或者 Image Magick.

根据上面各自引擎的特点,大家可结合实际需求选择或者根据安装难度来选择

运行环境准备好,接下来就开始正式安装了

    npm install grunt-spritesmith -D

由于网络环境等问题,安装过程经常会遇到报错的情况,可以仔细看下报错信息,有针对的处理下...

##问题处理，此处省略N多字...

##配置

    grunt.initConfig({  
      'sprite': {
        'all': {
          // 待合并的文件
          'src': ['sprites/*.png'],

          // 合并后输出的文件
          'destImg': 'public/images/sprite.png',
          
          // 输出对应雪碧图的样式
          'destCSS': 'less/sprite.less',
          
          // 可选: 手动指定样式里引用图片的路径
          'imgPath': '../sprite.png',
          
          // 可选: 指定算法 (top-down, left-right, diagonal,alt-diagonal, binary-tree )等
          // 默认是top-down,二叉树合并出来的图体积最小
          'algorithm': 'top-down',
          
          // 可选: 雪碧图中小图的间距
          'padding': 0,
          
          // 可选: 指定引擎 (auto, phantomjs, canvas, gm, pngsmith)
          'engine': 'phantomjs',
          
          // 可选: 指定CSS格式 (默认根据destCSS中的后缀设置格式)
              // (stylus, scss, scss_maps, sass, less, json, json_array, css)
          'cssFormat': 'less',
          
        }
      }
    });

这里只是基本配置项,还有一些可能需要特殊注意的配置

##合并算法的选择

- 根据图片的使用场景来定
  1. top-down 或者 left-right 重复背景比较方便
  2. diagonal 或者 alt-diagonal 独立，上下左右都不会出现其他图
  3. binary-tree 最佳合并，空间利用率最高
- 直接输出.css文件时，设置输出的class名
      'cssOpts': {
        'cssClass': function (item) {
          return '.icon-' + item.name;
        }
      }
- 输出.less文件,但是文件名包含@2x时，替换@
      'cssVarMap': function (sprite) {
        sprite.name = sprite.name.replace('@', '-');
      }

**完整配置内容参见** [https://github.com/Ensighten/grunt-spritesmith#usage]()

有了上面的这些配置后在一般的项目中就能够完全满足需求了,但是随着显示设备的不断升级,Retina图是不能被忽略掉的,但是对于Retina图来说background-size是比较麻烦的一点.下面就根据我的配置来介绍下如何解决这一问题

    sprite: {
          icon: {
              src: 'images/sprite/icon/*.png',
              destImg: 'public/images/icons.png',
              imgPath: '../images/icons.png',
              destCSS: 'less/icons.less',
              cssFormat: 'less',
              engine: 'phantomjs',
              padding: 0
          },
          retinaIcon: {
              src: 'images/sprite/retina/icon/*.png',
              destImg: 'public/images/icons-2x.png',
              imgPath: '../images/icons-2x.png',
              destCSS: 'less/icons-2x.less',
              cssFormat: 'less',
              cssVarMap: function(sprite) {
                  sprite.name = sprite.name.replace('@', '-');
              },
              engine: 'phantomjs',
              padding: 0
          }
    }


引入icons.less，icons-2x.less和并借助Less mixins来帮我们完成Retina样式的输出

    @import url('icons.less');
    @import url('icons-2x.less');
    
    // @2x Sprite helper
    
    .sprite-2x(@sprite2x, @sprite1x) {
        .sprite(@sprite1x);
    
        @media only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-device-pixel-ratio: 1.5) {
            .sprite(@sprite2x);
            .sprite-position(@sprite1x);
            .sprite-height(@sprite1x);
            .sprite-width(@sprite1x);
            .sprite-background-size(@sprite1x);
        }
    }

    .sprite-background-size(@sprite) {
        @total-width: ~`"@{sprite}".split(', ')[6]`;
        @total-height: ~`"@{sprite}".split(', ')[7]`;
        background-size: @total-width @total-height;
    }

然后再需要引用icon的地方直接调用

    .icon-add {
        .sprite-2x(@icon-add-2x, @icon-add);
    }
    .icon-add-hover{
        .sprite-2x(@icon-add-hover-2x, @icon-add-hover);
    }

sass和less 大同小异

    @mixin sprite-background-size($sprite) {
        background-size: nth($sprite, 7) nth($sprite, 8);
    }
    
    @mixin sprite-retina($sprite, $sprite2x) {
        @include sprite($sprite);
    
        @media only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-device-pixel-ratio: 1.5) {
            @include sprite-image($sprite2x);
            @include sprite-background-size($sprite);
        }
    }
    
    @include sprite-retina('icon-add', 'icon-add-2x');

至此关于雪碧图及Retina样式的问题就解决了,从此一身轻松啊！


