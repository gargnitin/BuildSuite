module.exports = {
    options: {
        method: 'POST',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding': 'gzip,deflate',
            'Accept-Language': 'de-de,de;q=0.8,en-us;q=0.5,en;q=0.3',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0'
        }
    },
    createMetaDirectory: {
        options: {
            url: 'https://<%= environment.webdav.server %><%= dw_properties.webDav.meta_import_root %>',
            form: {
                method: 'MKCOL'
            },
            auth: {
                user: '<%= environment.webdav.username %>',
                pass: '<%= environment.webdav.password %>'
            },
            ignoreErrors: true
        }
    },
    unzipMeta: {
        options: {
            url: 'https://<%= environment.webdav.server %><%= dw_properties.webDav.meta_import_root %><%= settings["meta.archive.name"] %>.zip',
            form: {
                method: 'UNZIP'
            },
            auth: {
                user: '<%= environment.webdav.username %>',
                pass: '<%= environment.webdav.password %>'
            }
        }
    },
    deleteCodeVersion: {
        options: {
            url: 'https://<%= environment.webdav.server %><%= dw_properties.webDav.cartridge_root %><%= versionInfo.versionName %>',
            ignoreErrors: true,
            form: {
                method: 'DELETE'
            },
            auth: {
                user: '<%= environment.webdav.username %>',
                pass: '<%= environment.webdav.password %>'
            }
        }
    },
    createCodeVersion: {
        options: {
            url: 'https://<%= environment.webdav.server %><%= dw_properties.webDav.cartridge_root %><%= versionInfo.versionName %>',
            form: {
                method: 'MKCOL'
            },
            auth: {
                user: '<%= environment.webdav.username %>',
                pass: '<%= environment.webdav.password %>'
            }
        }
    }
};
