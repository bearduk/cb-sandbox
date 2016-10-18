module.exports = function(grunt) {

  'use strict';

	// node require
	require('time-grunt')(grunt);

	grunt.initConfig({
		// create link to package.json items
    	pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 9000,
          base: './'
          }
        }
    },

      // grunt-contrib-compass		
    	compass: {                  	// Task
    		dev: {                   	// Target
				options: {              // Target options
			    	sassDir: 'components/sass',
			    	cssDir: 'builds/development/css',
			    	environment: 'development'
      			}
    		}, // close dist
    		prod: {                    // Another target
      			options: {
        			sassDir: 'components/sass',
        			cssDir: 'builds/production/css'
      			}
    		} // close dev
    	}, // close compass

      // grunt-postcss
    	postcss: {
			options: {
    			map: {
            inline: false,
            annotation: 'builds/production/css'
          },
          processors: [
      				require('pixrem')(), // disable if this gives issues with font mixins
      				require('autoprefixer')({ browsers: ['last 5 versions'] }),
      				require('cssnano')() // minify the result
    			]
  			},
  			dist: {
  				src:'builds/production/css/*.css'
  			}  // postcss options		    
    	},	// postcss

      watch: {
        scripts: {
        files: ['components/sass/**'],
        tasks: ['compass', 'postcss'],
        options: {
          spawn: false
          }
        }
      }       // end watch

	}); //initConfig

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');


	grunt.registerTask('default', ['connect', 'compass', 'postcss', 'watch']);

}; // wrapper function