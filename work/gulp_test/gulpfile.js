var gulp = require('gulp');//引入的gulp是一个对象
//引入的插件  均为方法
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cssClean = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var open = require('open');

//注册任务(基本语法)
// gulp.task('任务名',function(){
//     //任务的操作
//
// })

//注册 合并压缩js的任务
gulp.task('js',function(){
    return gulp.src('src/js/*.js') //找到目标源文件，将数据读取到gulp的内存中  *代表全部文件
        .pipe(concat('build.js')) //参数为 合并后 js文件的名字
        .pipe(gulp.dest('dist/js/')) //参数为 输出文件到的文件夹  只要还没有操作完说明当前的文件还在内存中
        .pipe(uglify()) //压缩文件
        .pipe(rename({suffix:".min"}))//重命名
        .pipe(gulp.dest('dist/js/'))
        .pipe(livereload())
        .pipe(connect.reload());
});
//注册 转换less为css的任务
gulp.task('less',function(){
    //带上return 为异步 ；不带return 为同步；异步速度快，因为任务可以同时加载，建议用异步
    return gulp.src('src/less/*.less')
        .pipe(less()) //编译less文件为css文件
        .pipe(gulp.dest('src/css/'))
        .pipe(livereload())
        .pipe(connect.reload());
});

//注册 合并压缩css文件的任务
gulp.task('css',['less'],function(){ //['less'] 表示 css任务的执行依赖于less任务，只有当less任务全部执行后，才会开启css任务
    return gulp.src('src/css/*.css') //找到文件
        .pipe(concat('build.css')) //合并文件
        .pipe(cssClean()) //压缩文件
        .pipe(rename({suffix: '.min'})) //重命名
        .pipe(gulp.dest('dist/css/')) //输出文件
        .pipe(livereload()) //实时刷新
        .pipe(connect.reload());
});

//注册 压缩html的任务
gulp.task('html',function(){
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest('dist/'))
        .pipe(livereload())
        .pipe(connect.reload());
});

//注册 监测任务（半自动）
gulp.task('watch',['default'],function(){
    //开启监听
    livereload.listen();
    //确认监听的目标以及绑定相应的任务
    gulp.watch('src/js/*.js',['js']);
    gulp.watch(['src/css/*.css','src/less/*.less'],['css'])
});
//注册 检测任务（全自动）
gulp.task('server',function(){
    //配置服务器的选项
    connect.server({
        root:"dist/",
        livereload:true,//实时刷新
        port:5000
    });
    //open可以自动打开指定的链接
    open('http://localhost:5000/');
    //确认监听的目标以及绑定相应的任务
    gulp.watch('src/js/*.js',['js']);
    gulp.watch(['src/css/*.css','src/less/*.less'],['css'])

});

//注册 默认任务
gulp.task('default',['js','less','css','html']);