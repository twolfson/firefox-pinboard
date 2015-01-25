module.exports = function(grunt) {
  // Configure our tasks
  grunt.initConfig({
    // For our build, clean the build directory
    clean: {
      build: ['tmp-build/']
    },

    // For our build, copy the entire directory
    copy: {
      build: {
        files: [{
          expand: true,
          src: ['lib/**/*'],
          dest: 'tmp-build/'
        }]
      }
    },

    // For our build, compile browserify files
    browserify: {
      build: {
        files: {
          'tmp-build/chrome/content/pinboardff.js': ['lib/chrome/content/pinboardff.js']
        }
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

    // TODO: During development, watch our files and trigger a re-upload via a push
  });

  // Load in grunt tasks
  require('load-grunt-tasks')(grunt);

  // Create task for building a distributable file
  grunt.registerTask('build', ['copy:build', 'browserify:build', 'zip']);
  grunt.registerTask('dev', ['watch:dev']);
};
