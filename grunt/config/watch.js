module.exports = {
  css: {
      files: ['<%= environment.watch_path %>/**/cartridge/scss/**'],
      tasks: ['sass:dev']
  },
  js: {
      files: ['<%= environment.watch_path %>/**/cartridge/js/**'],
      tasks: ['browserify:dev']
  },
    options: {
        nospawn: true,
        forever: false
    }
};