'use strict';

module.exports = {
  default: {
        src: '<%= dw_properties.folders.code %>' + '/*/cartridge/**/*.isml',
        options: {
            optimize_js:  '<%= settings["build.optimize.js"] %>',
            optimize_css: '<%= settings["build.optimize.css"] %>',
            merge_enabled: '<%= settings["static.files.concatenate"] %>'
        }
  }
};