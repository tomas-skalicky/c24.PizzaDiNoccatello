define(["squire"], function (Squire) {

  describe("On app", function () {

    describe("property 'currentModule'", function () {

      var async = new AsyncSpec(this),
          navigationServiceFake = null;

      beforeEach(function () {
        navigationServiceFake = (function () {
            var isStarted       = false,
            currentPath         = "",
            listeners           = [],
            addListener         = function (listener) {
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
            addListener    : addListener,
            startListening : startListening,
            navigateTo     : navigateTo
          };
        })();
      });

      afterEach(function () {
        navigationServiceFake = null;
      });

      async.it("should be 'home' after initialization (currentPath = '')", function (done) {
        new Squire()
          .mock("navigationService", navigationServiceFake)
          .require(["app"], function (app) {
            expect(app.currentModule()).toEqual("homePage");
            done();
          });
      });

      async.it("should be 'goCrazySelectLayer' after navigating to 'crazy/layers'", function (done) {
        new Squire()
          .mock("navigationService", navigationServiceFake)
          .require(["app"], function (app) {
            navigationServiceFake.navigateTo("crazy/layers");
            expect(app.currentModule()).toEqual("selectLayerPage");
            done();
          });
      });

      async.it("should be 'goCrazySelectLayer' after navigating to 'crAzY/lAyErs' (case insensitivity)", function (done) {
        new Squire()
          .mock("navigationService", navigationServiceFake)
          .require(["app"], function (app) {
            navigationServiceFake.navigateTo("crAzY/lAyErs");
            expect(app.currentModule()).toEqual("selectLayerPage");
            done();
          });
      });

      async.it("should be 'notfound' after navigating to an invalid path", function (done) {
        new Squire()
          .mock("navigationService", navigationServiceFake)
          .require(["app"], function (app) {
            navigationServiceFake.navigateTo("not/valid");
            expect(app.currentModule()).toEqual("notfoundPage");
            done();
          });
      });

    });

  });
});
