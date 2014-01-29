module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,

        strict: false,
        globals: {
          exports: true,
          describe: true,
          before: true,
          it: true
        }
      }
    },

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

    watch: {
      'default': {
        files: '<%= jshint.files %>',
        tasks: ['default']
      }
    }
  });

  // Load in grunt tasks
  require('load-grunt-tasks')(grunt);

  // Create task for getting original
  grunt.registerTask('install-original', ['curl', 'copy', 'unzip']);

  // Default task.
  grunt.registerTask('default', ['jshint']);

};
