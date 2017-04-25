'use strict';

var path = require('path');

/**
 * Set up site import based on configuration. 
 * 
 * Constists of 3 part: initialization, demo data and target instance based replacements
 * Everything is copied to output folder, the import task decides which of the parts are actually imported.
 */
function configureSiteImport(grunt, dependency) 
{
    //Default paths
    var siteInitPath = 'sites/site_template';
    var siteDemoPath = 'sites/site_demo';
    var instancePath = 'sites/config';
    
    //Base path of local checkout
    var basePath = grunt.config('dw_properties').folders.repos;
    
    //Check for Repository-based site import paths
    if(dependency.siteImport) {
        siteInitPath = dependency.siteImport.initPath || siteInitPath;
        siteDemoPath = dependency.siteImport.demoPath || siteDemoPath;
        instancePath = dependency.siteImport.instancePath || instancePath;
    }
    
    //Build complete relative site import paths
    var initSourceDir       = basePath + dependency.id + '/' + siteInitPath;
    var demoSourceDir       = basePath + dependency.id + '/' + siteDemoPath;
    var instanceSourceDir   = basePath + dependency.id + '/' + instancePath;

    //Handle local repository
    if(dependency.repository.type === 'file') {
        initSourceDir       = path.normalize(dependency.repository.url.slice('file://'.length) + '/' + siteInitPath);
        demoSourceDir       = path.normalize(dependency.repository.url.slice('file://'.length) + '/' + siteDemoPath);
        instanceSourceDir   = path.normalize(dependency.repository.url.slice('file://'.length) + '/' + instancePath);
    }
    
    grunt.log.writeln('      - Init data source: ' + initSourceDir);
    grunt.log.writeln('      - Demo data source: ' + demoSourceDir);
    grunt.log.writeln('      - Instance config source: ' + instanceSourceDir);

    grunt.config('copy.site_init_' + dependency.id, {
        cwd: initSourceDir,
        src: '**/*',
        dest: grunt.config('dw_properties').folders.site + 'site_init',
        expand: true,
        dot: false
    });
    
    grunt.config('copy.site_demo_' + dependency.id, {
        cwd: demoSourceDir,
        src: '**/*',
        dest: grunt.config('dw_properties').folders.site + 'site_demo',
        expand: true,
        dot: false
    }); 

    grunt.config('copy.site_config_' + dependency.id,  {
        cwd: instanceSourceDir,
        src: '**/*',
        dest: grunt.config('dw_properties').folders.site + 'config',
        expand: true,
        dot: false
    });
    
    grunt.task.run('copy:site_init_' + dependency.id);
    grunt.task.run('copy:site_demo_' + dependency.id);
    grunt.task.run('copy:site_config_' + dependency.id);
}


/**
 * Copy all source repositories to output folder
 */
module.exports = function(grunt) 
{
    grunt.registerMultiTask('dw_copy', 'Copy repositories to output folder, apply filters.', function() {
        var dependencies = grunt.config('dependencies');
        var settings = grunt.config('settings');

        dependencies.forEach(function(dependency) {
            grunt.log.writeln('   ** Repository: ' + dependency.id);
            
            var nonull = !dependency.source.ignoreEmpty;
            var dot = !settings['code.upload.excludehidden'];
            
            if(dependency.cartridges.length > 0) {
                //Cartridges given? Add each cartridge folder + globbing
                grunt.log.writeln('    - Cartridges: ');
                
                copyOptions = { files:[] };
                
                dependency.cartridges.forEach(function(cartridgeName) {
                    grunt.log.write('      - ' + cartridgeName + ' ');
                    var cwd = dependency.cwd + '/' + cartridgeName;
                    
                    if(!grunt.file.isDir(cwd)) {
                        //Cartridge directory not found? Check for ignoreEmpty and either stop or skip folder.
                        if(dependency.source.ignoreEmpty && dependency.source.ignoreEmpty == true) {
                            grunt.log.warn('Could not find cartridge, skipping');
                            return
                        } else {
                            grunt.fail.warn('Could not find cartridge!');
                        }
                    } else {
                        grunt.log.ok();
                    }
                    
                    var cartridgeOptions = {
                            cwd:    cwd,
                            src:    dependency.source.glob,
                            dest:   grunt.config('dw_properties').folders.code + cartridgeName,
                            expand: true,
                            nonull: nonull,
                            dot:    dot
                    }
                    
                    copyOptions.files.push(cartridgeOptions);
                });
            } else {
                //Cartridges NOT given? Copy whole directory.
                grunt.log.writeln('    - Copying complete repository. ');
                
                var copyOptions = {
                        cwd:    dependency.cwd,
                        src:    dependency.source.glob,
                        dest:   grunt.config('dw_properties').folders.code,
                        expand: true,
                        nonull: nonull,
                        dot:    dot
                }
            }
            
            grunt.config('copy.' + dependency.id, copyOptions);
            grunt.task.run('copy:' + dependency.id);
                        
            //Check whether site import (initialization/demodata) is triggered
            if (settings['build.project.codeonly']) {
                grunt.log.writeln('    - Site import disabled globally (build.project.codeonly).');
            }
            else if(dependency.siteImport && dependency.siteImport.enabled !== 'true') {
                grunt.log.writeln('    - Site import disabled for this repository.');
            }
            else {
                grunt.log.writeln('    - Copying Site import data.');
                configureSiteImport(grunt, dependency);
            }
        });
    });
};
