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
    replace: {
      dist: {
        src: ["dist/index.html"],
        dest: "dist/index.html",
        replacements: [{ 
          from: "<script data-main=\"main.dev\" src=\"bower_components/requirejs/require.js\"></script>",
          to: "<script src=\"main.min.js\"></script>"
        }, {
          from: "<script src=\"//localhost:35729/livereload.js\"></script>",
          to: ""
        }]
      }
    },
    prettify: {
      dist: {
        src: "dist/index.html",
        dest: "dist/index.html"
      }
    },
    uglify: {
      dist: {
        files: {
          "dist/main.min.js": ["dist/main.js"]
        }
      }
    },
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
          include: ["app", "home", "menu", "goCrazySelectLayer", "crazy2", "checkout", "notfound"],
          insertRequire: ["app"],
          mainConfigFile: "main.dist.js",
          out: "dist/main.js",
          optimize: "none", // possible values: "uglify" (default), "uglify2" or "none"
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
    },
    karma: {
      options: {
        configFile: "karma.conf.js"
      },
      unit: {
        exclude: ["test/integration/**/*.js"]
      },
      integration: {
        exclude: ["test/unit/**/*.js"]
      }
    },
    copy: {
      dist: {
        files: [{
          cwd: "dev/templates/",
          src: "**",
          dest: "dist/templates/",
          filter: "isFile",
          expand: true,
          nonull: true
        }, {
          src: "dev/index.html",
          dest: "dist/index.html"
        }]
      }
    },
    concat: {
      dist: {
        src: ["dev/bower_components/requirejs/require.js", "dist/main.js"],
        dest: "dist/main.js"
      }
    }
  });

  grunt.registerTask("default", ["test-unit", "clean", "build-html", "build-js"]);
  grunt.registerTask("live", ["default", "connect:dev", "open:dev", "watch:dev"]);
  grunt.registerTask("test-unit", ["jshint", "karma:unit"]);
  grunt.registerTask("test-integration", ["jshint", "karma:integration"]);
  grunt.registerTask("build-html", ["copy", "replace", "prettify"]);
  grunt.registerTask("build-js", ["requirejs", "concat", "uglify"]);

};
