module.exports = function() {
    return {
        options: {
            server:         'https://<%= environment.webdav.server %>',
            archiveName:    '<%= settings["config.archive.name"] %>.zip'
        },
        default: {
        }
    };
};