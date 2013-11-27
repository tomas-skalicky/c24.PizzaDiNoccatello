var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

require.config({
  "config": {
    "*": {
      "version": (new Date()).getTime(),
      "environment": "test"
    }
  },
  "baseUrl": "/base/dev/scripts/",
  "map": {
    "*": {
      "text": "../bower_components/text/text",
      "knockout": "../bower_components/knockout.js/knockout",
      "knockout-amd-helpers": "../bower_components/knockout-amd-helpers/build/knockout-amd-helpers",
      "pajamas": "../bower_components/pajamas/dist/pajamas",
      "q": "../bower_components/q/q",
      "squire": "../bower_components/squire/src/Squire"
    }
  },
  // ask Require.js to load these files (all our tests)
  "deps": tests,
  // start test run, once Require.js is done
  "callback": window.__karma__.start
});
