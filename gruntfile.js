'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // watch these files and fire the related tasks
    // https://github.com/gruntjs/grunt-contrib-watch#optionslivereload
    watch: {
      sass: {
        files: [
          'css/sass/**/*.{scss,sass}'
        ],
        tasks: ['sass:dev']
      },
      livereload: {
        files: [
          // 'js/**/*.{js,json}', // livereload with public js dir
          'css/style.css',
          'img/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      options: {
          includePaths: [
              'bower_components/foundation/scss',
              'bower_components/font-awesome/scss'
          ]
      },
      dev: {
        files: {
          'css/style.css': 'css/sass/style.scss'
        }
      }
    },
    cssmin: {
      minify: {
        options: {
          'keepSpecialComments': 1,
        },
        files: {
          'css/style.min.css': 'css/style.css',
        },
      },
    },
    concat: {
      dist: {
        files: {
          'js/concat.app.js' : [
            'lib/jquery/jquery.js',
            'lib/angular/angular.js',
            'lib/angular-cookies/angular-cookies.js',
            'lib/angular-resource/angular-resource.js',
            'lib/angular-route/angular-route.js',
            'js/app.js',
            'js/config.js',
            'js/directives/animate.js',

            'js/controllers/main.js',
            'js/controllers/editorController.js',
            'js/init.js'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'js/app.min.js' : ['js/concat.app.js']
        }
      }
    }

  });

  // load lib tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Register tasks
  // grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('default', ['css', 'watch']);
  grunt.registerTask('css',     ['sass', 'cssmin']);
  grunt.registerTask('build', ['sass', 'cssmin', 'concat', 'uglify']);

};
