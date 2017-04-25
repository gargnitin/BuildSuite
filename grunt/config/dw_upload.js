module.exports = {
    options: {      
        url: '<%= environment.webdav.server %>',
        
        two_factor: {
            enabled:   '<%= environment.two_factor.enabled %>',
            cert:      '<%= environment.two_factor.cert %>',
            password:  '<%= environment.two_factor.password %>',
            url:       '<%= environment.two_factor.url %>'
        }
        
    },
    
    code: {
        options: {
            release_path: '<%= dw_properties.webDav.cartridge_root %>',
            mode: 'code',
            cleanup: '<%=settings["code.upload.cleanup"]%>'
        },
        files: {
            src: '<%= dw_properties.folders.code %>*.zip'
        }
    },
    
    siteImport: {
        options: {
            release_path: '<%= dw_properties.webDav.site_import_root %>',
            unzipUpload: 'no'
        },
        files: {
            src: '<%= dw_properties.folders.site %><%= settings["config.archive.name"] %>.zip'
        }
    },
    
    siteMeta: {
        options: {
            release_path: '<%= dw_properties.webDav.meta_import_root %>',
            unzipUpload: 'no'
        },
        files: {
            src: '<%= dw_properties.folders.site %><%= settings["meta.archive.name"] %>.zip'
        }
    }
};