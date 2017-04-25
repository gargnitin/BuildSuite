/**
 *  Demandware Build Suite - part of the Community Suite
 *  @Contributors: Holger Nestmann, Danny Gehl, Jason Moody, Danny Domhardt, Daniel Mersiowsky
 **/

module.exports = function(grunt) {
    grunt.log.writeln('********************** Salesforce Commerce Cloud Build Suite **********************')
    grunt.log.writeln(' -- Initializing...');
    
	//var buildenv = grunt.option('build.target.environment');
	//grunt.log.writeln(environment.webdav.server);
	//environment.webdav.server = "dev35";
	
        
    var path = require('path');

    // load all Demandware specific plugins (not distributed by npm)
    grunt.loadTasks('grunt/tasks');

    // display execution time of grunt tasks
    require('time-grunt')(grunt);

    // load all grunt configs, look in the config directory to modify configuration for any specific task
    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt/config')
    });

    // Include the Demandware library.
    require('./grunt/lib/dw_init')(grunt);
    
    //var test = environment.webdav.server;
	//grunt.log.writeln(test);
	//environment.webdav.server = "dev35";
	//var test = environment.webdav.server;
	//grunt.log.writeln(test);
    
    grunt.log.write(' -- Initialization ');
    grunt.log.ok();
    grunt.log.writeln();
    grunt.log.writeln(" -- Project: " + grunt.config('versionInfo').projectName);
    grunt.log.writeln(" -- Version: " + grunt.config('versionInfo').versionName);
    grunt.log.writeln();
};