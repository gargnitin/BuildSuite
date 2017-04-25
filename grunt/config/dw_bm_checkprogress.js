module.exports = function(grunt) {
    return {
        options: {
            server: 'https://<%= environment.webdav.server %>',
            interval: 10000
        },
        content: {
            options: {
                archiveName:    '<%= settings["content.archive.name"] %>.zip',
                path:           '<%= dw_properties.impex.site.path %>',
                selector:       '<%= dw_properties.impex.site.selector %>',
                processLabel:   '<%= dw_properties.impex.site.importLabel %>'
            }
        },
        config: {
            options: {
                archiveName:    '<%= settings["config.archive.name"] %>.zip',
                path:           '<%= dw_properties.impex.site.path %>',
                selector:       '<%= dw_properties.impex.site.selector %>',
                processLabel:   '<%= dw_properties.impex.site.importLabel %>'
            }
        },
        systemMetaValidation: {
            options: {
                archiveName:    'system-objecttype-extensions.xml',
                path:           '<%= dw_properties.impex.meta.path %>',
                selector:       '<%= dw_properties.impex.meta.selector %>',
                processLabel:   '<%= dw_properties.impex.meta.validationLabel %>'
            }
        },
        systemMetaImport: {
            options: {
                archiveName:    'system-objecttype-extensions.xml',
                path:           '<%= dw_properties.impex.meta.path %>',
                selector:       '<%= dw_properties.impex.meta.selector %>',
                processLabel:   '<%= dw_properties.impex.meta.importLabel %>'
            }
        },
        customMetaValidation: {
            options: {
                archiveName:    'custom-objecttype-definitions.xml',
                path:           '<%= dw_properties.impex.meta.path %>',
                selector:       '<%= dw_properties.impex.meta.selector %>',
                processLabel:   '<%= dw_properties.impex.meta.validationLabel %>'
            }
        },
        customMetaImport: {
            options: {
                archiveName:    'custom-objecttype-definitions.xml',
                path:           '<%= dw_properties.impex.meta.path %>',
                selector:       '<%= dw_properties.impex.meta.selector %>',
                processLabel:   '<%= dw_properties.impex.meta.importLabel %>'
            }
        },
        exportUnits: {
            options: {
                archiveName:    '<%= generatedExportConfigName %>.zip',
                path:           '<%= dw_properties.impex.site.path %>',
                selector:       '<%= dw_properties.impex.site.selector %>',
                processLabel:   '<%= dw_properties.impex.site.exportLabel %>'
            }
        }
    };
};
