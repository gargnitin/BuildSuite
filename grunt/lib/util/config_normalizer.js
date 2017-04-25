'use strict';

var path = require('path');

/**
 * Ensures configuration properties have a proper format and default values are set.
 */
module.exports = function ConfigNormalizer(grunt) {
    
    /**
     * Checks for repository type and, if not given, tries to interpret URL
     */
    this.normalizeEnvironmentData = function(environment) {
        if(!environment.two_factor) {
            environment.two_factor = { enabled: "false" };
        }
        
        if(environment.two_factor.enabled.toString() === 'true') {
            grunt.log.writeln("   * Two factor auth enabled. Certificate file: " + environment.two_factor.cert);
            
            if(!grunt.file.exists(environment.two_factor.cert)) {
                grunt.fail.fatal('Certificate file could not be loaded.');
            }
            
            //Check if correct URL for 2factor auth is used
            if (!environment.two_factor.url || environment.two_factor.url.indexOf('cert') !== 0) {
                grunt.fail.warn('Incorrect host ("' + environment.two_factor.url + '") for two factor auth (must begin with "cert.")');
            }
        }
        
        if(!environment.sass) {
            environment.sass = { };
        }
        
        if(!environment.sass.sourcePath) {
            environment.sass.sourcePath = 'scss';
        }
        
        if(!environment.sass.sourceFile) {
            environment.sass.sourceFile = 'style.css';
        }
        
        if(!environment.watch_path) {
            environment.watch_path = '../not-defined';
        }
        
        return environment;
    }
    
    /**
     * Checks for repository type and, if not given, tries to interpret URL
     */
    this.normalizeRepositoryData = function(dependency) {
        var url = dependency.repository.url;
        
        //Write default source path
        if(!dependency.source.path) {
            dependency.source.path = 'cartridges';
        }
        
      //Write default source globbing
        if(!dependency.source.glob) {
            dependency.source.glob = '**/*';
        }
        
        //Remove trailing slashes
        if(dependency.repository.url.lastIndexOf('/') === dependency.repository.url.length - 1) {
            dependency.repository.url = url.substring(0, dependency.repository.url.length -1);
        }
        
        // Try and detect the type if it wasn't explicity passed.
        if (!dependency.repository.type) {
            if (url.indexOf('git@') == 0 || url.indexOf('.git') == url.length - 4) {
                // Is this a Git repository?
                dependency.repository.type = 'git';
            } else if (url.indexOf('svn') > -1) {
                // ...or an SVN repository?
                dependency.repository.type = 'svn';
            } else {
                // ...must be file then
                dependency.repository.type = 'file';
            }
        }
        
        //Check for relative local paths and resolve them
        if(dependency.repository.type === 'file' && url.indexOf('file:') !== 0 && url.indexOf('/') !== 0 && url.indexOf('\\') !== 0) {
            url = 'file://' + path.resolve(url);
            url = url.replace(/\\/g,'/');
            
            dependency.repository.url = url;
        }
        
        if(!dependency.cartridges) {
            dependency.cartridges = [];
        }

        return dependency;
    }
    

    /**
     * Extracts project name from the repository URL. Needed for decent logging/output.
     */
    this.setDependencyId = function(dependency) {
        if(dependency.id && dependency.id.length > 2)
            return dependency;
        
        var url = dependency.repository.url;
        
        //dependency ID is the last part of the repository URL (Either behind last / or : for Git URLs)
        var containsSlash = url.indexOf('/') !== -1;
        var index = containsSlash ? (url.lastIndexOf('/') + 1) : url.lastIndexOf(':');
        
        var projectId = url.slice(index);
        
        //Clean ".git" off the end of the repository name in case of Git Repo
        projectId = projectId.replace('.git', '');
        
        //Dots will screw up the task reference so we replace all of them
        projectId = projectId.replace(/\./g, '_');
        
        //ID must be longer than 
        if(projectId.length < 2) {
            grunt.fail.warn('Project name could not be extracted. Please check or assign manually. URL: ' + dependency.repository.url + ', Project name: ' + projectId);
        }
        
        dependency.id = projectId;
        return dependency;
    }

    
    /**
     * Determines the (target) CWD for each dependency, checks existence of local repositories
     */
    this.setDependencyCwd = function(dependency) {
        //Set CWD for each dependency
        dependency.cwd = grunt.config('dw_properties').folders.repos + dependency.id + '/' + dependency.source.path;
        
        //If local repository: Modify CWD and check path
        if(dependency.repository.type == 'file') {
            dependency.cwd = path.normalize(dependency.repository.url.slice('file://'.length) + '/' + dependency.source.path);
            
            if(!grunt.file.isDir(dependency.cwd)) {
                grunt.log.warn('Local cartridge directory "' + dependency.cwd + '" does not exist. Please check your settings.');
            }
        }
        
        return dependency;
    }
    
    
    /**
     * Normalize environment data, set default values  
     */
    this.processEnvironment = function() 
    {
        var environment = grunt.config.get('environment');
        environment = this.normalizeEnvironmentData(environment);
        
        grunt.config.set('environment', environment);
    }
    
    
    /**
     * Normalize repository data, generate depency IDs, build CWD path  
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
            dependency = self.normalizeRepositoryData(dependency);
            dependency = self.setDependencyId(dependency);
            dependency = self.setDependencyCwd(dependency);
            
            newDeps.push(dependency);
        });
        
        grunt.config.set('dependencies', newDeps);
    }
    
    
    /**
     * Reads the version information from command line arguments or configuration
     */
    this.initVersionInfo = function() {
        var projectName = grunt.option('build.project.name')    || grunt.config('settings.build\\.project\\.name'); 
        var versionName = grunt.option('build.project.version') || grunt.config('settings.build\\.project\\.version');
        var buildNumber = grunt.option('build.project.number')  || grunt.config('settings.build\\.project\\.number');
        
        if (buildNumber) {
            versionName += '-' + buildNumber;
        }
        
        //save version information to config
        grunt.config('versionInfo', {
            projectName: projectName,
            versionName: versionName,
            buildNumber: buildNumber
        });
    }
    

    /**
     * Main function that calls the normalization functions
     */
    this.run = function() 
    {
        this.processEnvironment();
        this.initVersionInfo();
        this.processRepositories();
    }
}