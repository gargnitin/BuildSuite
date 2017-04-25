'use strict';

/**
 *  Create site import configuration structure
 **/
module.exports = function(grunt) {
    grunt.registerMultiTask('dw_prepare_site_import', 'Create site import package', function() 
    {
        var codeOnly = grunt.config.get('settings')['build.project.codeonly'];
        
        if(codeOnly && codeOnly.toString().toLowerCase() === 'true') {
            grunt.fail.warn('Build Suite is set to "code only" mode. Please disable and rebuild project. (settings.build.project.codeonly)');
        }
        
        var environment = grunt.config.get('environment');
        var options = this.options();
        
        var siteImport = require('../lib/util/site_import')(grunt);
        siteImport.cleanup();

        //Import site initialization data if set
        if(options.importInit) {
            grunt.log.writeln(" -- Importing Site initialization data");
            siteImport.copySiteInitData();
        } 
        
        //Import demo site if set
        if(options.importDemo) {
            grunt.log.writeln(" -- Importing demo data for Site.");
            siteImport.copySiteDemoData();
        }
        
        //Instance-specific import and application of eventually configured replacement
        var instanceConfig = environment.site_import ? loadInstanceConfig(environment.site_import.instance) : null;
        
        if(instanceConfig) {
            grunt.log.writeln(" -- Applying replacements for target instance: " + environment.site_import.instance);
            siteImport.updateData(instanceConfig.replacements);
        }
        
        if(!siteImport.checkForFiles()) {
            grunt.fail.warn('No files found. Please check setup, run build and check again.');
        }
    });
    
    
    /**
     * Loads instance-based configuration data
     * 
     * @param instance
     */
    function loadInstanceConfig(target)
    {
        var instanceConfig;
        
        //Load corresponding config if target instance is given
        if(target) {
            var instanceConfigFile = grunt.config('dw_properties').folders.site + target + '/config.json';
            grunt.log.verbose.writeln('Reading instance configuration from: ' + instanceConfigFile);
            
            if(grunt.file.exists(instanceConfigFile)) {
                instanceConfig = grunt.file.readJSON(instanceConfigFile);
                grunt.log.verbose.writeln('Using instance configuration: ' + instanceConfig);
            }
            
            if(!instanceConfig) {
                grunt.log.warn('No config.json found for instance ' + target);
            }
        }

        return instanceConfig;
    }
};


