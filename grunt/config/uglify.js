module.exports = {
    all: {
        files: [{
            expand: true,
            cwd:    '<%= dw_properties.folders.code %>/',
            src:    ['**/cartridge/static/**/*.js', '!*.min.js', '!**/lib/**/*.js'],
            dest:   '<%= dw_properties.folders.code %>/'
        }]
    }
    /* Additional targets created in lib/generate_config */
};