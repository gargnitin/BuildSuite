module.exports = {
    options: {
        server:     'https://<%= environment.webdav.server %>',
        login:      '<%= environment.webdav.username %>',
        password:   '<%= environment.webdav.password %>',
        debug:      false // debug http requests
    },
    default: {}
};
