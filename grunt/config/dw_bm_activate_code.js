module.exports = function() {
  return {
    options: {
      server: 'https://<%= environment.webdav.server %>',
      codeVersionID: '<%= versionInfo.versionName %>'
    },
    default: {
    }
  };
};
