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
          from: /<!--\s*BUILD\s*\:\s*Scripts\s*-->[\S\s]*?<!--\s*\/\s*BUILD\s*\:\s*Scripts\s*-->/g,
          to: "<script src=\"main.min.js\"></script>"
        }, { 
          from: /<!--\s*BUILD\s*\:\s*Styles\s*-->[\S\s]*?<!--\s*\/\s*BUILD\s*\:\s*Styles\s*-->/g,
          to: "<link rel=\"stylesheet\" href=\"styles/all.min.css\">"
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
          include: ["app", "home", "allaCartePage", "goCrazySelectLayer", "crazy2", "checkoutPage", "notfoundPage"],
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
        files: ["Gruntfile.js", "dev/main.dev.js", "dev/scripts/**/*.js", "test/**/*.js", "dev/**/*.html", "dev/**/*.css"],
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
          cwd: "dev/styles/",
          src: "**",
          dest: "dist/styles/",
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
    },
    cssmin: {
      combine: {
        files: {
          "dist/styles/all.min.css": [
            "dist/styles/main.css",
            "dist/styles/home.css",
            "dist/styles/menu.css",
            "dist/styles/goCrazySelectLayer.css",
            "dist/styles/crazy2.css",
            "dist/styles/checkout.css",
            "dist/styles/notfound.css",
            "dist/styles/allaCarteMenu.css",
            "dist/styles/basket.css"
          ]
        }
      }
    }
  });

  grunt.registerTask("default", ["test-unit", "clean", "build-html", "build-js", "build-css"]);
  grunt.registerTask("live", ["default", "connect:dev", "open:dev", "watch:dev"]);
  grunt.registerTask("test-unit", ["jshint", "karma:unit"]);
  grunt.registerTask("test-integration", ["jshint", "karma:integration"]);
  grunt.registerTask("build-html", ["copy", "replace", "prettify"]);
  grunt.registerTask("build-js", ["requirejs", "concat", "uglify"]);
  grunt.registerTask("build-css", ["cssmin"]);

};
