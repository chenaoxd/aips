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
        watch: { /* nothing to do in watch anymore */ }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', ['nodemon']);
};
