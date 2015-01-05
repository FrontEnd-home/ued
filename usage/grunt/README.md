使用gulp
========

[使用Gulp为项目提速](http://www.solodu.com/speed-project-with-glup/)

##安装

    npm install -g grunt-cli

####在Gruntfile所在目录通过命令行的方式调用运行已经安装好的Grunt

##CLI工作原理

每次运行grunt时，它都会使用node的require()系统查找本地已安装好的grunt


**由于网络环境问题,建议将npm registry设置为国内镜像  npm config set registry http://registry.npm.taobao.org**


##Grunt配置文件(package.json)

用于保存项目元数据(项目信息及依赖)

    {
      "name": "project-name",
      "version": "0.1.0",
      "description": "project description",
      "repository": "svn or git",
      "author": "solodu",
      "dependencies": {
        "grunt": "~0.4.5",
        "grunt-contrib-watch": "~0.6.1"
      },
      "devDependencies": {
        "grunt-contrib-less": "~0.11.1",
        "grunt-spritesmith": "~1.24.0"
      }
    }

####版本号选择

    指定固定版本: 1.2.3
    指定版本范围: > < = >= <= 1.2.3
    指定版本区间: 1.2.3 - 2.3.4
    指定1.2.0(3)以上，1.3.0以下最新版本: ~1.2 ~1.2.3
    指定1.2.0(3)以上，2.0.0以下最新版本: ^1.2 ^1.2.3

####Gruntfile.js

用于配置或者定义Grunt任务和加载Grunt插件,一份合理的配置文件会成倍的提升工作效率

    module.exports = function(grunt) {  
        //配置任务
        grunt.initConfig({
            sprite: {
                icon: {
                    src: 'img/sprite/icon/*.png',
                    destImg: 'dist/img/icons.png',
                    destCSS: 'less/icons.less',
                    algorithm: 'binary-tree',
                    cssFormat: 'css',
                    cssOpts: {
                        cssClass: function(item) {
                            return '.' + item.name;
                        }
                    },
                    padding: 0
                }
            },
            less: {
                build: {
                    options: {
                        paths: ["less/"],
                        cleancss: true
                    },
                    files: {
                        "css/style.css": "less/style.less"
                    }
                }
            },
            watch: {
                less: {
                    files: 'less/*.less',
                    tasks: ['less'],
                    options: {
                        livereload: true
                    }
                },
                img: {
                    files: 'img/**/*.png',
                    tasks: ['sprite'],
                    options: {
                        livereload: true
                    }
                }
            }
        });
        //加载任务
        grunt.loadNpmTasks('grunt-spritesmith');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-watch');
        //执行任务
        grunt.registerTask('default', ['sprite', 'less', 'watch']);
    };

更多详细介绍: [Grunt中文网](http://gruntjs.cn/)

##Grunt任务

####常用Grunt插件

- grunt-spritesmith 合并雪碧图,并生成对应样式
- grunt-contrib-imagemin 压缩图片
- grunt-contrib-less 编译Less
- grunt-contrib-uglify 压缩js
- grunt-contrib-connect 搭建本地服务器
- grunt-contrib-watch 检测文件变动
- grunt-contrib-copy 复制文件
- grunt-contrib-compress 压缩打包
- 更多实用插件 [http://gruntjs.com/plugins]()

##安装Grunt插件

- 如果package.json已配置好,则在项目根目录直接运行npm install
- 手动安装 npm install grunt-xxx --save-dev(或-D) 或者 npm install grunt-xxx --save


