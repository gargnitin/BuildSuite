'use strict';
/**
 * @module
 * Module containing functions for creating site imports
 */
module.exports = (function(grunt) {
    /**
     * Temporary "target" path where files are placed and processed. 
     * This folder will be zipped and uploaded.
     */
    function getBasePath() 
    {
        var targetFolderName = grunt.config.get('settings')['config.archive.name'];
        
        if(!targetFolderName || targetFolderName.length == 0) {
            grunt.fail.warn('Archive name for config data not configured (settings.config.archive.name).');
        }
        
        return grunt.config('dw_properties').folders.site + targetFolderName;
    }


    /**
     * The source path for the site import 
     * This folder was placed in "output" directory by build/dw_copy task.
     */
    function getImportPath() 
    {
        var importPath = grunt.config('dw_properties').folders.site;
        
        if (!importPath) {
            grunt.fail.fatal('Import path is not set');
        }
        
        if(!grunt.file.isDir(importPath)) {
            grunt.file.mkdir(importPath);
        }

        return importPath;
    }

    /**
     * @private
     */
    function copyConfiguration(dir) 
    {
        var src = [dir + '/**/*', '!' + dir + '/*.zip'];
        var dest = getBasePath();
        
        grunt.log.verbose.writeln('  - Target: ' + dest);
        
        /** @FIXME: Site filter must be documented and tested! **/
//      var filter = grunt.config.get('environment').site_import.filter;
//
//      if(filter && typeof filter.map === 'function') {
//          src.push('!'+dir + '/sites/**/*');
//          src = src.concat(filter.map(function(site) {
//              return dir + '/sites/' + site + '/**/*';
//          }));
//          grunt.log.writeln("Found site filter, calculated globbing pattern: " + src);
//      }
        
        grunt.log.verbose.writeln('  - Glob: ' + JSON.stringify(src));
        
        grunt.file.expand(src).forEach(function(file) {
            if (grunt.file.isFile(file)) {
                var f = file.replace(dir, '');
                grunt.file.copy(file, dest + f);
            }
        }); 
    }

    
    /**
     * retrieves files based on replacement file values
     * 
     * @param {Object} replacement - the replacement object
     */
    function fetchFiles(replacement) 
    {
        // use globbing to modify all files matching given pattern in given rule.
        var files = {};
        replacement.files.forEach(function(file) {
            var allFiles = grunt.file.expand(getBasePath() + '/' + file);
            grunt.log.verbose.writeln('Globbed ' + file + ' to: ', allFiles);

            allFiles.forEach(function(f) {
                files[f] = f;
            });
        });

        return files;
    }
    
    
    /**
     * update data in xml and text files
     * 
     * @param {Object} replacements - object containing xml and text replacements
     */
    function updateData(replacements) {
        if (replacements.xmlReplacements) {
            updateXML(replacements.xmlReplacements);
        }

        if (replacements.textReplacements) {
            updateText(replacements.textReplacements);
        }
    }
    
    
    /**
     * Execute XML replacements
     * 
     * Configures an xmlpoke task to be run after the current executing task.
     */
    function updateXML(replacements) 
    {
        grunt.log.verbose.writeln('updateXML rules ', replacements);
        var files;

        if (typeof replacements !== 'undefined' && replacements.length > 0) {
            replacements.forEach(function(replacement, index) {
                files = fetchFiles(replacement);

                grunt.log.verbose.writeln('Set "' + replacement.xpath + '" to "' + replacement.value + (replacement.valueType ? '" (type: "' + replacement.valueType + '")' : ''), files);

                // Setup xmlpoke configuration based on the given rules array.
                grunt.config('xmlpoke.' + index, {
                    options: {
                        xpath: replacement.xpath,
                        value: replacement.value,
                        namespaces: replacement.namespaces ? replacement.namespaces : {},
                        valueType: replacement.valueType ? replacement.valueType : 'text'
                    },
                    files: files
                });
            });

            // run the replacements
            grunt.task.run('xmlpoke');
        }
    }


    /**
     * Execute text replacements 
     * 
     * @param {Array} replacements - Array containing text replacement data
     */
    function updateText(replacements) {
        var basePath = getBasePath(),
            basePathSep = '|',
            srcString,
            srcFiles = [];

        replacements.forEach(function(replacement, index) {
            srcString = basePath + replacement.files.join(basePathSep + basePath);
            srcFiles = srcString.split(basePathSep);
            grunt.log.verbose.writeln('Set text replace ' + replacement.regex + ' to ' + replacement.value, ' for files', srcFiles);
            grunt.config('replace.' + (index+1), {
                src: srcFiles,
                overwrite: true,
                replacements: [{
                    from: replacement.regex,
                    to: replacement.value
                }]
            });

            // run the replacements
            grunt.task.run('replace');
        });

    }

    
    /**
     * Copy generic configuration into site-import output folder.
     */
    function copySiteInitData() 
    {
        var sourcePath = getImportPath() + 'site_init';
        
        grunt.log.verbose.writeln('  * Source: ' + sourcePath);
        copyConfiguration(sourcePath);
    }

    
    /**
     * @public Copy demo site data to site_import folder
     */
    function copySiteDemoData() 
    {
        var sourcePath = getImportPath() + 'site_demo';
        
        grunt.log.verbose.writeln('  * Source: ' + sourcePath);
        copyConfiguration(sourcePath);
    }

    
    /**
     * Checks if the output directory actually contains files.
     */
    function checkForFiles() 
    {
        var size = 0;
        
        if(!grunt.file.isDir(getBasePath())) {
            return false;
        }
        
        //Walk through directory and count files.
        grunt.file.recurse(getBasePath(), function(file) { 
            if(grunt.file.isFile(file)) {
                size++;
                return;
            }
                
        });
        
        if(size > 0)
            return true;
        
        return false;
    }

    
    /**
     * Clear given folder in output directory, by default it will clear the site_import folder.
     * @public
     */
    function cleanup() 
    {
        var directory = getBasePath();
        
        if (grunt.file.isDir(directory)) {
            grunt.log.verbose.writeln('Cleanup output folder ' + directory);
            grunt.file.delete(directory);
        }
    }
    
    
    return {
        copySiteDemoData: copySiteDemoData,
        copySiteInitData: copySiteInitData,
        cleanup: cleanup,
        checkForFiles: checkForFiles,
        updateData: updateData
    };
});
