module.exports = function(grunt) {
  // Configure our tasks
  grunt.initConfig({
    // Download original
    curl: {
      original: {
        src: 'https://pinboard.in/extensions/firefox/pinboardff.xpi',
        dest: 'tmp/pinboardff.xpi'
      }
    },
    copy: {
      original: {
        src: 'tmp/pinboardff.xpi',
        dest: 'tmp/pinboardff.zip'
      }
    },
    unzip: {
      original: {
        src: 'tmp/pinboardff.zip',
        dest: 'lib/',
      }
    },

    // Build for distribution
    zip: {
      build: {
        cwd: 'tmp-build/',
        src: 'tmp-build/**/*',
        dest: 'dist/firefox-pinboard.xpi'
      }
    }
  });

  // Load in grunt tasks
  require('load-grunt-tasks')(grunt);

  // Create task for getting original
  grunt.registerTask('install-original', ['curl', 'copy', 'unzip']);

  // Create task for building a distributable file
  grunt.registerTask('build', ['zip']);
};
