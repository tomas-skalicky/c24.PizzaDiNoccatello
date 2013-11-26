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
    jshint: {
      files: ["Gruntfile.js", "dev/scripts/**/*.js", "test/**/*.js"],
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
          mainConfigFile: "dev/scripts/main.js",
          name: "main",
          out: "dist/<%= pkg.name %>.js",
          optimize: "uglify",
          preserveLicenseComments: false,
          useStrict: true,
          wrap: false
        }
      }
    },
    watch: {
      options: {
        nospawn: true
      },
      files: ["<%= jshint.files %>"],
      tasks: ["jshint"],
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          "dev/**/*.html",
          "dev/scripts/**/*.js"
        ]
      }
    },
    connect: {
      options: {
        port: 8080,
        // change this to 0.0.0.0 to access the server from outside
        hostname: "localhost"
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, "dev"),
              lrSnippet
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: "http://localhost:<%= connect.options.port %>"
      }
    },
  });

  grunt.registerTask("default", ["jshint", "requirejs"]);
  grunt.registerTask("server", ["connect:livereload", "open", "watch"]);
  grunt.registerTask("test", ["jshint"]);

};