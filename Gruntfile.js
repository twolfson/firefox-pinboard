var fs = require('fs');

module.exports = function (grunt) {
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
          cwd: 'lib/',
          src: ['**/*'],
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
    },

    // During development, watch our files and trigger a re-upload via a push
    watch: {
      build: {
        files: ['lib/**/*'],
        tasks: ['build', 'shell:push-build']
      }
    },
    // DEV: We must use `wget` to upload to our server
    //   https://github.com/palant/autoinstaller/issues/3
    shell: {
      'push-build': {
        target: {
          command: 'wget --verbose --post-file=dist/firefox-pinboard.xpi http://localhost:8888/'
        }
      }
    }
  });
  // Load in grunt tasks
  require('load-grunt-tasks')(grunt);

  // Create task for building a distributable file
  grunt.registerTask('build', ['clean:build', 'copy:build', 'browserify:build', 'zip']);
  grunt.registerTask('dev', ['watch:dev']);
};
