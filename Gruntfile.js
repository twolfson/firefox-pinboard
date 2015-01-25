module.exports = function(grunt) {
  // Configure our tasks
  grunt.initConfig({
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
