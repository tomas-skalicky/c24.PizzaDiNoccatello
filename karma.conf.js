// Karma configuration
// Generated on Wed Nov 27 2013 15:53:48 GMT+0100 (W. Europe Standard Time)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '.',


    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'dev/bower_components/jasmine.async/lib/jasmine.async.js',
      'main.test.js',
      {pattern: 'test/**/*Spec.js', included: false},
      {pattern: 'dev/scripts/**/*.js', included: false},
      {pattern: 'dev/bower_components/text/text.js', included: false},
      {pattern: 'dev/bower_components/knockout.js/knockout.js', included: false},
      {pattern: 'dev/bower_components/knockout-amd-helpers/build/knockout-amd-helpers.js', included: false},
      {pattern: 'dev/bower_components/pajamas/src/pajamas.js', included: false},
      {pattern: 'dev/bower_components/q/q.js', included: false},
      {pattern: 'dev/bower_components/squire/src/Squire.js', included: false}
    ],


    // list of files to exclude
    //exclude: ['main.dist.js'],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DISABLE,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
