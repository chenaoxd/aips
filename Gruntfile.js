module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: '3000'
                    }
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ['./public/less'],
                    yuicompress: true
                },
                files: {
                    './public/css/test.css': './public/less/test.less'
                }
            }
        },
        watch: {
            files: "./public/less/*.less",
            tasks: ['less']
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', ['less','watch']);
};
