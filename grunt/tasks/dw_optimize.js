'use strict';

module.exports = function (grunt) {
    grunt.registerTask('dw_optimize', 'Static resource optimization', function(){
        //JS Optimization enabled?
        if (grunt.config('settings.build\\.optimize\\.js')) {
            grunt.log.ok('Javascript optimization enabled.');
            grunt.task.run('uglify');
        } else {
            grunt.log.warn('Javascript optimization disabled - skipping.');
        }
        
        //CSS Optimization enabled?
        if (grunt.config('settings.build\\.optimize\\.css')) {
            grunt.log.ok('CSS optimization enabled.');
            grunt.task.run('cssmin');
        } else {
            grunt.log.warn('CSS optimization disabled - skipping.');
        }
    });
};