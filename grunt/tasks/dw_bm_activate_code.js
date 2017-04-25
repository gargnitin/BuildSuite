'use strict';

/**
 * Activate code version in BM.
 **/
module.exports = function(grunt) {
  grunt.registerMultiTask('dw_bm_activate_code', 'Activate code version in BM', function() {
    var options = this.options(),
      done = this.async(),
      request = require('../lib/util/bm_request'),
      bmUtils = require('../lib/util/dw_bm_utils');

    if (!options.codeVersionID) {
      throw 'No code version name provided for this process';
    }

    grunt.log.verbose.writeln('Activate code version ' + options.codeVersionID);

    //request import & export page
    request.post({
      url: options.server + '/on/demandware.store/Sites-Site/default/ViewCodeDeployment-Activate',
      form: {
        CodeVersionID: options.codeVersionID
      },
      jar: true
    }, function(error, resp, body) {
      if (!bmUtils.isLoggedIn(body)) {
        throw 'Not able to login into business manager';
      }
      else {
        done();
      }
    });
  });
};
