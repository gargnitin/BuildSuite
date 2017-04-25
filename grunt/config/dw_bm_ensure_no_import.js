module.exports = function(grunt) {
    return {
        options: {
            server: 'https://<%= environment.webdav.server %>'
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
        }
    };
};
