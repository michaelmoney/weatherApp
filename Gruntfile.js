module.exports = function(grunt) {
    // Grunt configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nwjs: {
            win: {
                options: {
                    platforms: ['win32'],
                    buildDir: 'build', // builded NW destination folder
                    version: "0.12.3"
                },
                src: ['dist/**'] // app source
            },
            osx: {
                options: {
                    platforms: ['osx64'],
                    buildDir: 'build', // builded NW destination folder
                    version: "0.12.3"
                },
                src: ['dist/**'] // app source
            }

        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/index.js': 'app/index.es6'
                }
            }
        },
        less: {
            dev: {
                options: {
                    paths: ["app"],
                    strictMath: true
                },
                files: {
                    "dist/styles.css": "app/styles.less"
                }
            }
        },
        watch:{
            all: {
                files: ['app/*.es6', 'app/*.less', 'app/*.html'],
                tasks: ['babel', 'less:dev','copy']
            }
        },
        copy: {
            dist: {
                expand: true,
                cwd: 'app',
                src: ['index.html', 'weather-template.html', 'package.json', 'angular.min.js'],
                dest: 'dist/'
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-nw-builder');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');


    // Main build task
    grunt.registerTask('build:osx', ['less:dev', 'babel','copy:dist', 'nwjs:osx']);
    grunt.registerTask('build:win', ['less:dev', 'babel','copy:dist', 'nwjs:win']);

    grunt.registerTask('serve', ['watch:all']);


};

