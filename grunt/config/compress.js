module.exports = {
        
    /* Put all cartridges in one single Zip file. Might get overwritten by generate_config */
    code: {
        options: {
            archive: '<%= dw_properties.folders.code %><%= versionInfo.versionName %>.zip'
        },
        files: [{
            src: ['**/*', '!**/*.zip'],
            cwd: '<%= dw_properties.folders.code %>',
            dest: '<%= versionInfo.versionName %>',
            expand: true,
            dot: true
        }]
    },

    /* Package all contents, ignore any generated zip file contents*/
    siteImport: {
        options: {
            archive: '<%= dw_properties.folders.site %><%= settings["config.archive.name"] %>.zip'
        },
        files: [{
            src: ['**/<%= settings["config.archive.name"] %>/**/*', '!**/*.zip'],
            cwd: '<%= dw_properties.folders.site %>',
            expand: true,
            dot: true
        }]
    },

    /* Package only meta data*/
    siteMeta: {
        options: {
            archive: '<%= dw_properties.folders.site %><%= settings["meta.archive.name"] %>.zip'
        },
        files: [{
            src: ['site_init/meta/*', 'site_demo/meta/*'],
            cwd: '<%= dw_properties.folders.site %>',
            flatten: true,
            expand: true,
            dot: true
        }]
    }
};
