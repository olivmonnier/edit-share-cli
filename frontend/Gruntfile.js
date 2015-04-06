// Generated on 2015-02-20 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['app/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server']
      },
      src: {
        files: ['app/scripts/*.js', 'app/styles/*.css', '*.html']
      }
    },

    // The actual grunt server settings
    connect: {
      server: {
        options: {
          port: 9000,
          open: true,
          livereload: true,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost',
          base: 'app'
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['bower_components']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: ['*.{scss,sass}'],
          dest: 'dist/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: ['*.{scss,sass}'],
          dest: 'app/styles',
          ext: '.css'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          'dist/styles/main.css': [
            'app/styles/{,*/}*.css'
          ]
        }
      },
      server: {
        files: {
          'app/styles/main.css': [
            'app/styles/{,*/}*.css'
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/scripts/app.js': [
            'app/scripts/**/*.js'
          ]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: {
          'dist/index.html': 'app/index.html'
        }
      }
    }

  });

  grunt.registerTask('serve',
    'start the server and preview your app, --allow-remote for remote access',
    function(target) {
      if (grunt.option('allow-remote')) {
        grunt.config.set('connect.server.options.hostname', '0.0.0.0');
      }
      if (target === 'dist') {
        return grunt.task.run(['build', 'connect:dist:keepalive']);
      }

      grunt.task.run([
        'connect',
        'watch'
      ]);
    });

  grunt.registerTask('server', function(target) {
    grunt.log.warn(
      'The `server` task has been deprecated. Use `grunt serve` to start a server.'
    );
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });


  grunt.registerTask('build', [
    'cssmin',
    'uglify',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
