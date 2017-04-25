'use strict';

/**
 * Configuration Mapper is responsible for backwards compatibility.
 * Has the capability to write a JSON configuration file in proper (new) format.
 * 
 */
module.exports = function ConfigMapper(grunt) {
    
    /**
     * Maps "old stype" (flat) JSON to object based environment configuration
     */
    this.mapLegacyEnvironmentConfig = function(environment) {
        if(!environment.watch_path && environment['watch.path']) {
            environment.watch_path = environment['watch.path'];
            delete environment['watch.path'];
        }
            
        if(!environment.webdav) {
            environment.webdav = {
                server: environment['webdav.server'],
                username: environment['webdav.username'],
                password: environment['webdav.password']    
            };
            
            delete environment['webdav.server'];
            delete environment['webdav.username'];
            delete environment['webdav.password'];
        }
        
        if(!environment.two_factor && environment['webdav.two_factor']) {
            environment.two_factor = {
                    enabled:  environment['webdav.two_factor'],
                    cert:     environment['webdav.two_factor.cert'],
                    password: environment['webdav.two_factor.password'],
                    url:      environment['webdav.server.cert.url']
            };
            
            delete environment['webdav.two_factor'];
            delete environment['webdav.two_factor.cert'];
            delete environment['webdav.two_factor.password'];
            delete environment['webdav.server.cert.url'];
        }
        
        //Site Import Settings changed twice over the last 12 months
        if(!environment.site_import) {
            if(environment.siteImport) {
                environment.site_import = { instance: environment.siteImport.targetInstance };
                delete environment.siteImport;
            } else if(environment['site.import.instance']) {
                environment.site_import = { instance: environment['site.import.instance'] };
                delete environment['site.import.instance'];
            }
        }

        return environment;
    }
    
    
    /**
     * Maps "old style" (flat) JSON to object based repository data
     */
    this.mapLegacyVcsConfig = function(dependency) {
        if (typeof dependency !== 'object') {
            return null;
        }
        
        //Compatibility to old repository URL with implicit user+pass
        if(!dependency.repository.url) {
            var repo = dependency.repository || '';
            var type = dependency.type || null;
            var branch = dependency.branch;
            
            dependency.repository = {
                url: repo,
                type: type,
                branch: branch
            };
        }
        
        //If old repo URL, maybe we have username + password in there too? If yes, extract
        if (dependency.repository.url.indexOf("@") > 0 && dependency.repository.url.indexOf("git@") < 0) {
            // Extract Username Password from repository URL
            var arrUrl = dependency.repository.url.split("//");
            var tmpUrl = arrUrl[1] || arrUrl[0];
            
            //Get first part of URL, split username+password
            var substrCredentials = tmpUrl.substring(0, tmpUrl.lastIndexOf('@'));
            var credentials = substrCredentials.split(":");
            dependency.repository.username = credentials[0];
            dependency.repository.password = credentials[1];

            //Extract actual repository URL
            dependency.repository.url = "https://" + tmpUrl.substring(tmpUrl.lastIndexOf('@') + 1);
        }
        
        //Compatibility to old "includeCartridges" setting
        if(!dependency.cartridges && dependency.includeCartridges) {
            grunt.log.warn('The property "includeCartridges" was renamed to "cartridges". Please update your configuration structure.');
            dependency.cartridges = dependency.includeCartridges || [];
        }
        
        //Compatibility to old "global" source.path and source.glob setting
        if(!dependency.source) {
            dependency.source = {};
            var environment = grunt.config.get('environment');
            
            if(environment['source.path']) {
                grunt.log.warn('Use of global source path is discouraged - please use repository-based source.path option.');
                dependency.source.path = environment['source.path']; 
            }
            
            if(environment['source.glob']) {
                grunt.log.warn('Use of global source globbing is discouraged - please use repository-based source.glob option.');
                dependency.source.glob = environment['source.glob'].split(',');
            }
        }
        
        return dependency;
    }
    
    
    /**
     * Handle repository-based mappings: Iterate over dependencies, convert to current format if legacy, normalize, generate an ID 
     */
    this.processRepositories = function() {
        var deps = grunt.config.get('dependencies');
        var self = this;
        
        //Filter out "empty" dependencies
        deps = deps.filter(function(value) {
            return value !== '';
        });
        
        var newDeps = [];
        
        //Iterate over dependencies and apply all kinds of mappings 
        deps.forEach(function (dependency) {
            dependency = self.mapLegacyVcsConfig(dependency);           
            newDeps.push(dependency);
        });
        
        grunt.config.set('dependencies', newDeps);
    }
    
    
    /**
     * Configuration Migration functionality.
     * 
     * Formats all (mapped) parts of the project configuration, deletes legacy settings, writes output to "config.json.new" file
     */
    this.writeMigratedConfig = function() {
        //Remove legacy source path/glob (was mapped already at this point)
        var environment = grunt.config.get('environment');
        delete environment['source.path'];
        delete environment['source.glob'];
        
        //Remove legacy + generated properties from dependencies
        var dependencies = grunt.config.get('dependencies');
        var dependenciesOutput = [];
        dependencies.forEach(function (dependency) {
            delete dependency.cwd;
            delete dependency.id;
            delete dependency.type;
            delete dependency.branch;
            delete dependency.includeCartridges;
            
            dependenciesOutput.push(dependency);
        });
        
        var projectConfig = {'dependencies': dependenciesOutput, 'environment': environment};
        
        grunt.log.writeln(JSON.stringify(projectConfig, null, 2));
        grunt.fail.warn('done.');
    }
    
    
    /**
     * "Main" function that calls the mappings
     */
    this.run = function() {
        //Map Environment to new structure
        var environment = grunt.config.get('environment');
        environment = this.mapLegacyEnvironmentConfig(environment);
        grunt.config.set('environment', environment);
        
        this.processRepositories();
        
        //Migration is currently disabled, will be reused for new single-file JSON config format
        if(grunt.option.flags().indexOf('--migrate') != -1) {
            this.writeMigratedConfig();
        }
    }
}