var LIVERELOAD_PORT = 35729;
var lrSnippet = require("connect-livereload")({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require("path").resolve(dir));
};

module.exports = function (grunt) {
  "use strict";

  // load all grunt tasks:
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: ["dist"],
    jshint: {
      files: ["Gruntfile.js", "dev/main.dev.js", "dev/scripts/**/*.js", "test/**/*.js"],
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
          include: ["app"],
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
      dev: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: ["Gruntfile.js", "dev/main.dev.js", "dev/scripts/**/*.js", "test/**/*.js", "dev/**/*.html"],
        tasks: ["default"]
      }
    },
    connect: {
      options: {
        // change this to * to access the server from everywhere
        hostname: "localhost"
      },
      dev: {
        options: {
          port: 8080,
          middleware: function (connect) {
            return [mountFolder(connect, "dev"), lrSnippet];
          }
        }
      },
      test: {
        options: {
          port: 8081,
          base: "."
        }
      }
    },
    open: {
      dev: {
        path: "http://localhost:<%= connect.dev.options.port %>"
      }
    // },
    // jasmine: {
    //   unit: {
    //     options: {
    //       specs: 'test/**/*Spec.js',
    //       template: jmTemplate,
    //       templateOptions: {
    //         requireConfigFile: 'test/main.test.js'
    //       }
    //     }
    //   }
    }
  });

  grunt.registerTask("default", ["test", "clean", "requirejs"]);
  grunt.registerTask("server", ["default", "connect:dev", "open:dev", "watch:dev"]);
  grunt.registerTask("test", ["jshint", "connect:test"]);

};