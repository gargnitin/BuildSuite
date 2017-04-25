module.exports = function() {
    return {
        options: {
            server: 'https://<%= environment.webdav.server %>',
            archiveName: '<%= settings["content.archive.name"] %>.zip'
        },
        default: {
        }
    };
};
