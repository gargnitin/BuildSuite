/**
 * Copy all source repositories to output folder
 */
module.exports = function(grunt) 
{
    grunt.registerMultiTask('dw_compress', 'Compress Code into Zip files.', function() {
        var settings = grunt.config('settings');
        
        if (settings['code.upload.granularity'] !== 'CARTRIDGE') {
            grunt.log.writeln('   ** Granularity set to "VERSION". Calling generic compress task.');
            grunt.task.run('compress:code');
        } else {
            grunt.log.writeln('   ** Granularity set to "CARTRIDGE". Generating Cartridge-based compress tasks.');

            var dw_properties = grunt.config('dw_properties');
            var versionInfo = grunt.config('versionInfo');
            
            var directories = grunt.file.expand(dw_properties.folders.code + '*');
            
            if(directories.length == 0) {
                grunt.fail.warn('Could not find any cartridges in source folder: ' + dw_properties.folders.code);
            }
            
            grunt.log.writeln('    - Cartridges:');
            
            //Compress all (cartridge-) directories.
            directories.forEach(function(dir) {
                if(!grunt.file.isDir(dir)) {
                    //Only compress folders
                    return;
                }
                
                //Cartridge name = folder name
                var cartridgeName = dir.split('/').reverse()[0];
                grunt.log.writeln('     - ' + cartridgeName);
                
                //Prepare compress task
                var cartridgeOptions = {
                    options: {
                        archive: dw_properties.folders.code + versionInfo.versionName +  '_' + cartridgeName + '.zip'
                    },
                    src: ['**/*', '!**/*.zip'],
                    cwd: dw_properties.folders.code + cartridgeName,
                    dest: versionInfo.versionName + '/' + cartridgeName,
                    expand: true,
                    dot: true
                };
                
                //Add config+task to queue
                grunt.config('compress.' + cartridgeName, cartridgeOptions);
                grunt.task.run('compress:' + cartridgeName);
            });
        }
    });
};
