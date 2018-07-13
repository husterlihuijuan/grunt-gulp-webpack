module.exports = function(grunt) {

    // 初始化配置grunt任务
    //grunt.initConfig({});

    grunt.initConfig({
        concat: {//任务名
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/js/*.js'],//和操作（合并）的源文件 *表示所有
                dest: 'build/js/build.js',//输出到指定的目录下
            },
        },
        pkg: grunt.file.readJSON('package.json'),//类似变量
        uglify: {//任务名
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'  //类似 模板字符串
            },
            build: {
                files: {
                    'build/js/build.min.js': ['build/js/build.js'] //压缩后的文件 ：需要压缩的文件列表
                }
            }
        },
        jshint : {
            options: {
                jshintrc : '.jshintrc' //指定配置文件
            },
            build : ['Gruntfile.js', 'src/js/*.js'] //指定检查的文件
        },
        cssmin:{
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            build: {
                files: {
                    'build/css/build.min.css': ['src/css/*.css']
                }
            }
        },
        watch : {
            scripts : {
                files : ['src/js/*.js', 'src/css/*.css'],
                tasks : ['concat', 'jshint', 'uglify', 'cssmin'],
                options : {spawn : false}
            }
        },

    });
    // 当grunt任务执行的时候去加载对应的任务插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 默认被执行的任务列表
    grunt.registerTask('default', ['concat','uglify','jshint','cssmin']);
    grunt.registerTask('myWatch',['default','watch']);

};