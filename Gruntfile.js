//Gruntfile
module.exports = function(grunt) {

  //Initializing the configuration object
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: [
          './src/assets/vendor/jquery/dist/jquery.js',
          './src/assets/vendor/underscore/underscore.js',
          './src/assets/vendor/ractive/ractive.js',
          './src/assets/vendor/d3/d3.js',
          './src/assets/vendor/topojson/topojson.js',
          './src/assets/vendor/datamaps/dist/datamaps.world.js',
          './src/assets/js/**/*.js',
          './src/assets/js/*.js',
        ],
        dest: './out/static/js/main.js',
      },
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          './out/static/js/main.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: './src/assets/scss',
          src: ['*.scss'],
          dest: './out/static/css/',
          ext: '.css'
        }]
      }
    },
    watch: {
      js: {
        files: ['./src/assets/js/**/*.js', './src/assets/js/*.js'],
        tasks: ['concat:js', 'uglify'],
      },
      sass: {
        files: ['./src/assets/scss/**/*.scss', './src/assets/scss/*.scss'],
        tasks: ['sass'],
      },
      copy: {
        files: ['./src/data/*', './src/*.html', './src/**/*.html'],
        tasks: ['copy'],
      },
    },

    // development server
    connect: {
      server: {
        options: {
          port: 9999,
          base: './out/',
          hostname: 'localhost',
          open: true
        }
      }
    },

    copy: {
      main: {
        files: [
          // data files, ignore raw
          {
            expand: true,
            cwd: './src/',
            src: ['data/*', '!data/raw'],
            dest: './out/',
            filter: 'isFile'
          },

          // html files in src, ignore assets
          {
            expand: true,
            cwd: './src/',
            src: ['*.html', '**/*.html', '!assets/**'],
            dest: './out/'
          },

          // fonts
          {
            expand: true,
            cwd: './src/assets/vendor/open-sans/',
            src: ['fonts/**'],
            dest: './out/static/'
          },
        ]
      }
    },

    clean: ['./out']

  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');



  // Task definition
  grunt.registerTask('build', ['concat:js', 'sass', 'uglify']);
  grunt.registerTask('default', ['clean', 'copy', 'build']);
  grunt.registerTask('dev', ['connect', 'default', 'watch']);


};