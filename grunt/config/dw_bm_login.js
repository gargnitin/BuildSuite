module.exports = function() {
    return {
        options: {
            server:   'https://<%= environment.webdav.server %>',
            username: '<%= environment.webdav.username %>',
            password: '<%= environment.webdav.password %>'
        },

        default: { }
    };
};
