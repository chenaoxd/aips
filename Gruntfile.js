module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['*.js'],
                tasks: ['start'],
                options: {
                    spawn: false
                }
            }
        }
    });
    // Load the plugin that provides the "watch" task.
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('start', function(){
        grunt.util.spawn({
            cmd: 'node',
            args: ['app.js']
        });
        grunt.task.run('watch');
    });
    
    // Default task(s).
    grunt.registerTask('default', ['start']);
};
