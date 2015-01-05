编译SASS
========

编译SASS需要使用gulp或grunt，我们这里采用gulp

操作可参考：[http://segmentfault.com/blog/laopopo/1190000000372547?page=1]()

##安装（全局）

    npm install -g gulp

我们需要将gulp安装到项目本地

    npm install —-save-dev gulp

我们使用—-save-dev来更新package.json文件，更新devDependencies值，以表明项目需要依赖gulp。

##安装依赖

    npm install gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename --save-dev

现在，组件都安装完毕，我们需要新建gulpfile文件以指定gulp需要为我们完成什么任务。

##新建Gulpfile文件，运行gulp

gulp只有五个方法： task，run，watch，src，和dest，在项目根目录新建一个js文件并命名为gulpfile.js，把下面的代码粘贴进去：

    // 引入 gulp
    var gulp = require('gulp'); 
    
    // 引入组件
    var jshint = require('gulp-jshint');
    var sass = require('gulp-sass');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    
    // Lint任务 检查脚本
    gulp.task('lint', function() {
        gulp.src('./js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });
    
    // Sass任务 编译Sass
    gulp.task('sass', function() {
        gulp.src('./scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./css'));
    });
    
    // Scripts 任务 合并，压缩文件
    gulp.task('scripts', function() {
        gulp.src('./js/*.js')
            .pipe(concat('all.js'))
            .pipe(gulp.dest('./dist'))
            .pipe(rename('all.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist'));
    });
    
    // 默认任务
    gulp.task('default', function(){
        gulp.run('lint', 'sass', 'scripts');
    
        // 监听文件变化
        gulp.watch('./js/*.js', function(){
            gulp.run('lint', 'sass', 'scripts');
        });
    });

这一步，我们引入了核心的gulp和其他依赖组件，接下来，分开创建lint, sass, scripts 和 default这四个不同的任务。

- Link任务会检查`js/`目录下得js文件有没有报错或警告。
- Sass任务会编译`scss/`目录下的scss文件，并把编译完成的css文件保存到`/css`目录中。
- scripts任务会合并`js/`目录下得所有得js文件并输出到`dist/`目录，然后gulp会重命名、压缩合并的文件，也输出到`dist/`目录。
- 这时，我们创建了一个基于其他任务的default任务。使用`.run()`方法关联和运行我们上面定义的任务，使用`.watch()`方法去监听指定目录的文件变化，当有文件变化时，会运行回调定义的其他任务。

现在，回到命令行，可以直接运行gulp任务了。

    gulp          
    //这将执行定义的default任务
    //换言之，这和以下的命令式同一个意思
    gulp default

    //我们也可以运行在gulpfile.js中定义的任意任务，比如，现在运行sass任务：
    gulp sass