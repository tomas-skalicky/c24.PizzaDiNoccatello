var LIVERELOAD_PORT = 35729;
var lrSnippet = require("connect-livereload")({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require("path").resolve(dir));
};

var jmTemplate = require('grunt-template-jasmine-requirejs');

module.exports = function (grunt) {
  "use strict";

  // load all grunt tasks:
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: ["dist"],
    jshint: {
      files: ["Gruntfile.js", "dev/main.js", "dev/scripts/**/*.js", "test/**/*.js"],
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          document: true
        }
      }
    },
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          include: ["app", "dataService", "page1", "page2"],
          mainConfigFile: "main.dist.js",
          out: "dist/main.js",
          optimize: "none", // "uglify": (default), "uglify2" or "none"
          preserveLicenseComments: false,
          useStrict: true,
          wrap: false
        }
      }
    },
    watch: {
      options: {
        spawn: false
      },
      devLive: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: ["Gruntfile.js", "dev/main.js", "dev/scripts/**/*.js", "test/**/*.js", "dev/**/*.html"],
        tasks: ["default"]
      }
    },
    connect: {
      options: {
        port: 8080,
        // change this to 0.0.0.0 to access the server from outside
        hostname: "localhost"
      },
      devLive: {
        options: {
          middleware: function (connect) {
            return [mountFolder(connect, "dev"), lrSnippet];
          }
        }
      }
    },
    open: {
      devLive: {
        path: "http://localhost:<%= connect.options.port %>"
      }
    },
    jasmine: {
      tt: {
        //src: 'dev/scripts/**/*.js',
        options: {
          specs: 'test/*Spec.js',
          template: jmTemplate,
          templateOptions: {
            requireConfigFile: 'test/main.js'
          }
        }
      }
    }
  });

  grunt.registerTask("default", ["test", "clean", "requirejs"]);
  grunt.registerTask("server", ["default", "connect:devLive", "open:devLive", "watch:devLive"]);
  grunt.registerTask("test", ["jshint", "jasmine"]);

};