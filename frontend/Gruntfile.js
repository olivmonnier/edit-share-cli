'use strict';

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
    // connect: {
    //   server: {
    //     options: {
    //       port: 9000,
    //       open: true,
    //       livereload: true,
    //       // Change this to '0.0.0.0' to access the server from outside
    //       hostname: 'localhost',
    //       base: 'app'
    //     }
    //   }
    // },

    concat: {
      options: {
        separator: ';',
      },
      extension: {
        src: 'app/scripts/bower_components/ace-builds/src-min-noconflict/ext-*.js',
        dest: 'app/scripts/ace-lib/ace-extensions.js'
      }
      //   themes: {
      //     src: 'app/scripts/bower_components/ace-builds/src-min-noconflict/theme-*.js',
      //     dest: 'app/scripts/ace-lib/ace-themes.js'
      //   },
      //   modes: {
      //     src: 'app/scripts/bower_components/ace-builds/src-min-noconflict/mode-*.js',
      //     dest: 'app/scripts/ace-lib/ace-modes.js'
      //   },
      //   workers: {
      //     src: 'app/scripts/bower_components/ace-builds/src-min-noconflict/worker-*.js',
      //     dest: 'app/scripts/ace-lib/ace-workers.js'
      //   }
    },

    clean: {
      dist: [".tmp", "dist"],
      server: ['.tmp']
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

    copy: {
      dist: {
        files: [{
          src: 'app/index.html',
          dest: 'dist/index.html'
        }, {
          cwd: 'app/scripts/bower_components/ace-builds/src-min-noconflict',
          src: '**/*',
          dest: 'dist/scripts/ace-lib/',
          expand: true
        }, {
          src: 'app/scripts/ace-lib/ace-extensions.js',
          dest: 'dist/scripts/ace-lib/ace-extensions.js'
        }, {
          cwd: 'app/fonts',
          src: '**/*',
          dest: 'dist/fonts',
          expand: true
        }]
      },
      server: {
        files: [{
          cwd: 'app/scripts/bower_components/ace-builds/src-min-noconflict',
          src: '**/*',
          dest: 'app/scripts/ace-lib/',
          expand: true
        }, {
          cwd: 'app/scripts/bower_components/bootstrap-sass-official/assets/fonts/bootstrap',
          src: '**/*',
          dest: 'app/fonts/',
          expand: true
        }]
      }
    },

    'useminPrepare': {
      options: {
        dest: 'dist'
      },
      html: 'app/index.html'
    },

    usemin: {
      html: ['dist/index.html']
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
          'dist/index.html': 'dist/index.html'
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
        'clean:server',
        'concat',
        'sass:server',
        'copy:server'
      ]);
    });

  grunt.registerTask('server', function(target) {
    grunt.log.warn(
      'The `server` task has been deprecated. Use `grunt serve` to start a server.'
    );
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });


  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concat',
    'copy:dist',
    'cssmin',
    'uglify',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
