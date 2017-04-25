module.exports = {
    build: {
        options: {
            sourceMap: true,
            browserifyOptions: {
                        debug: true
                    }
        },
        files: [{
            expand: true,
            cwd: '<%= dw_properties.folders.code %>',
            src: '**/cartridge/js/app.js',
            dest: '<%= dw_properties.folders.code %>',
            rename: function(dest, src) {
                return dest + src.replace('js/', 'static/default/js/');
            }
        }]
    },
    dev: {
        options: {
            require: ['lodash', 'imagesloaded', 'promise'],
            sourceMap: true,
            browserifyOptions: {
                debug: true
            }
        },
        files: [{
            expand: true,
            cwd: '<%= environment.watch_path %>/',
            src: '**/cartridge/js/app.js',
            dest: '<%= environment.watch_path %>/',
            rename: function(dest, src) {
                return dest + src.replace('js/', 'static/default/js/');
            }
        }]
    }
};
