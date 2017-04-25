module.exports = {
    build: {
        options: {
            style: 'expanded',
            sourceMap: true
        },
        // Switch to using maps of files in config.json
        files: [{
            expand: true,
            cwd: '<%= dw_properties.folders.code %>',
            src: '**/<%= environment.sass.sourcePath %>/**/<%= environment.sass.sourceFile %>',
            ext: '.css',
            dest: '<%= dw_properties.folders.code %>',
            _path: '<%= environment.sass.sourcePath %>',
            rename: function (dest, src) {
                var fileName = src.substring(src.lastIndexOf('/') + 1);
                var path = src.substring(0, src.lastIndexOf('/'));
                path = path.replace(this._path, 'static');
                
                return dest +  path + '/css/' + fileName;
            }
        }]
    },
    dev: {
        options: {
            style: 'expanded',
            sourceMap: true
        },
        files: [{
            expand: true,
            cwd: '<%= environment.watch_path %>',
            src: '**/<%= environment.sass.sourcePath %>/**/<%= environment.sass.sourceFile %>',
            ext: '.css',
            dest: '<%= environment.watch_path %>/',
            rename: function(dest, src) {
                var fileName = src.substring(src.lastIndexOf('/') + 1);
                var path = src.substring(0, src.lastIndexOf('/'));
                path = path.replace('scss', 'static');
                
                return dest +  path + '/css/' + fileName;
            }
        }]
    }
};