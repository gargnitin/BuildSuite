module.exports = {
    options: {
        processors: [
            require('autoprefixer')({})
        ]
    },
    build: {
        files: [{
            expand: true,
            cwd: '<%= dw_properties.folders.code %><%= versionInfo.versionName %>/',
            src: '**/*.css',
            dest: '<%= dw_properties.folders.code %><%= versionInfo.versionName %>/'
        }]
    },
    dev: {
        files: [{
            expand: true,
            cwd: '<%= environment.watch_path %>/',
            src: '*/cartridge/static/*/css/**/*.css',
            dest: '<%= environment.watch_path %>/'
        }]
    }
};
