'use strict';

var ConfigMapper = require('./util/config_mapper');
var ConfigNormalizer = require('./util/config_normalizer');
var Encryption = require('./util/encryption');


/**
 * Replaces any instance of ${VAR_NAME} with the the evaluated value of process.env.VAR_NAME
 * 
 * @Contributors: patmat,jba-amblique
 */
function replaceEnvironmentVariables(grunt, original)
{
    //Only replace in strings
    if(typeof original !== "string") {
        return original;
    }
    
    var tokenRegExp = new RegExp("\\$\\{(.+?)\\}","g");
    
    var result = original.replace(tokenRegExp, function(a,b) {
        var environmentVariableValue = process.env[b] || grunt.option(b);
        if (typeof environmentVariableValue !== 'undefined') {
            environmentVariableValue.replace(/(^\s*)|(\s*$)/,"");
        }
        return environmentVariableValue;
    });
    
    return result;
}


/**
 * Initialization: Load and evaluate config files, map and normalize configuration, run en/decryption 
 */
module.exports = function(grunt) {
    var mapper = new ConfigMapper(grunt);
    var normalizer = new ConfigNormalizer(grunt);
    var encryption = new Encryption(grunt);

    var configFileName = grunt.config.get('dw_properties.configFile');
    grunt.log.write('   * Loading ' + configFileName + '... ');
    
    if(!grunt.file.exists(configFileName))
        grunt.fail.fatal('File does not exist.');

    
    //Load global config.json
    var configFile = grunt.file.read(configFileName);
    
    try {
        var configData = JSON.parse(replaceEnvironmentVariables(grunt, configFile));
        grunt.log.ok();
    }
    catch(e) {
        grunt.fail.fatal(e.toString());
    }
    

    //Load project config.json
    var projectFileName = 'build/projects/' +   configData.settings['build.project.name'] + '/config.json';
    grunt.log.write('   * Loading ' + projectFileName + '... ');
    
    if(!grunt.file.exists(projectFileName))
        grunt.fail.fatal('File does not exist.');
    
    var projectFile = grunt.file.read(projectFileName);
    
    try {
        var projectData = JSON.parse(replaceEnvironmentVariables(grunt, projectFile));
        grunt.log.ok();
    }
    catch(e) {
        grunt.fail.fatal(e.toString());
    }

    //Load settings to grunt config
    grunt.config.set('settings', configData.settings);
    grunt.config.set('environment', projectData.environment);
    grunt.config.set('dependencies', projectData.dependencies);
    
    //Map legacy configuration
    mapper.run();
    
    //Normalize configuration data
    normalizer.run();
    
    //Password encryption, encrypts password or loads and decrypts the existing one
    encryption.run(projectFileName);
    
    //"--print-config" Command line parameter is used for (selective) printing of config data
    if(grunt.option('print-config')) {
        if(grunt.option('print-config') === true) {
            grunt.log.writeln(JSON.stringify(grunt.config(), null, 2));
        } else {
            grunt.log.writeln(" *** Config for '" + grunt.option('print-config') + "':");
            grunt.log.writeln(JSON.stringify(grunt.config(grunt.option('print-config')), null, 2));
        }
    }
    
    //Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs where hostname / IP do not match
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
};
