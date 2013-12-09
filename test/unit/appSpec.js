define(["squire"], function (Squire) {

  describe("On app", function () {

    describe("property 'currentModule'", function () {

      var async = new AsyncSpec(this),
          routerFake = null;

      beforeEach(function () {
        routerFake = (function () {
          var isStarted = false,
          currentPath = "",
          listeners = [],
          addListener = function (listener) {
            listeners.push(listener);
            if (isStarted) {
              listener(currentPath);
            }
          },
          startListening = function () {
            isStarted = true;
            notifyAll();
          },
          notifyAll = function () {
            listeners.forEach(function (listener) {
              listener(currentPath);
            });
          },
          navigateTo = function (path) {
            currentPath = path;
            if (isStarted) {
              notifyAll();
            }
          };
          return {
            addListener: addListener,
            startListening: startListening,
            navigateTo: navigateTo
          };
        })();
      });

      afterEach(function () {
        routerFake = null;
      });

      async.it("should be 'home' after initialization (currentPath = '')", function (done) {
        new Squire()
          .mock("router", routerFake)
          .require(["app"], function (App) {
            var app = new App();
            expect(app.currentModule()).toEqual("home");
            done();
          });
      });

      async.it("should be 'crazy1' after navigating to 'crazy/doughs'", function (done) {
        new Squire()
          .mock("router", routerFake)
          .require(["app"], function (App) {
            var app = new App();
            routerFake.navigateTo("crazy/doughs");
            expect(app.currentModule()).toEqual("crazy1");
            done();
          });
      });

      async.it("should be 'crazy1' after navigating to 'crAzY/dOugHs' (case insensitivity)", function (done) {
        new Squire()
          .mock("router", routerFake)
          .require(["app"], function (App) {
            var app = new App();
            routerFake.navigateTo("crAzY/dOugHs");
            expect(app.currentModule()).toEqual("crazy1");
            done();
          });
      });

      async.it("should be 'notfound' after navigating to an invalid path", function (done) {
        new Squire()
          .mock("router", routerFake)
          .require(["app"], function (App) {
            var app = new App();
            routerFake.navigateTo("not/valid");
            expect(app.currentModule()).toEqual("notfound");
            done();
          });
      });

    });

  });
});
