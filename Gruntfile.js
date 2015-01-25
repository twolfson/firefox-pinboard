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
        tasks: ['build', 'push-build']
      }
    },
    // TODO: Figure out how to add file uploads to grunt-curl
    curl: {
      'push-build': {
        src: {
          url: 'http://localhost:8888/',
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          body: new Buffer('Run `update-curl` before running this task')
        }
      }
    }
  });

  // Define custom task for updating the curl content body
  grunt.registerTask('update-curl', 'Update the curl info for our push', function buildPush () {
    // Load in the curl config
    var curlConfig = grunt.config.get('curl');

    // Update the request body
    curlConfig['push-build'].src.body = fs.readFileSync(__dirname + '/dist/firefox-pinboard.xpi');
  });

  // Load in grunt tasks
  require('load-grunt-tasks')(grunt);

  // Create task for building a distributable file
  grunt.registerTask('push-build', ['update-curl', 'curl:push-build']);
  grunt.registerTask('build', ['clean:build', 'copy:build', 'browserify:build', 'zip']);
  grunt.registerTask('dev', ['watch:dev']);
};
