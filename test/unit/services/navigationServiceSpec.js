define(["squire"], function (Squire) {

  describe("navigationService", function () {

    var async      = new AsyncSpec(this),
        windowFake = null;

    beforeEach(function () {
      windowFake = {
        location   : {
          href     : "http://pizza-di-noccatello.it/online-trattoria/#/home",
          protocol : "http:",
          host     : "pizza-di-noccatello.it",
          pathname : "/online-trattoria/",
          search   : "",
          hash     : "#/crazy/layers",
          replace  : function (newHref) {
            windowFake.location.href = newHref;
          }
        },
        _addedListeners: [],
        addEventListener: function (eventType, listener, useCapture) {
          if ((eventType !== "hashchange") || (typeof listener !== "function") || useCapture) {
            throw new Error("Unexpected arguments for fake object.");
          }
          windowFake._addedListeners.push(listener);
        },
        _triggerEvent: function () {
          windowFake._addedListeners.forEach(function (listener) {
            listener();
          });
        }
      };
    });

    afterEach(function () {
      windowFake = null;
    });

    async.it("should notify all registered listeners when 'startListening' is called", function (done) {
      var listeners = [ 1, 2, 3 ].map(jasmine.createSpy);
      new Squire()
        .mock("window", windowFake)
        .require(["navigationService"], function (navigationService) {
          listeners.forEach(navigationService.addListener);
          navigationService.startListening();
          listeners.forEach(function (listener) {
            expect(listener).toHaveBeenCalledWith("crazy/layers");
          });
          done();
        });
    });     

    async.it("should re-notify all registered listeners when the document fragment has changed", function (done) {
      var listeners = [ 1, 2, 3 ].map(jasmine.createSpy);
      new Squire()
        .mock("window", windowFake)
        .require(["navigationService"], function (navigationService) {
          listeners.forEach(navigationService.addListener);
          navigationService.startListening();
          windowFake.location.hash = "#/crazy/ingredients";
          windowFake._triggerEvent();
          listeners.forEach(function (listener) {
            expect(listener).toHaveBeenCalledWith("crazy/layers");
            expect(listener).toHaveBeenCalledWith("crazy/ingredients");
          });
          done();
        });
    });     

    async.it("'getCurrentPath' should return a cleaned up path", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["navigationService"], function (navigationService) {
          expect(navigationService.getCurrentPath()).toEqual("crazy/layers");
          done();
        });
    });     

    async.it("'navigateTo' should construct the correct target URL", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["navigationService"], function (navigationService) {
          navigationService.navigateTo("crazy/ingredients");
          expect(windowFake.location.href).toEqual("http://pizza-di-noccatello.it/online-trattoria/#/crazy/ingredients");
          done();
        });
    });     

    async.it("'navigateTo' should construct the correct target URL for an unclean path", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["navigationService"], function (navigationService) {
          navigationService.navigateTo("#crazy/ingredients/");
          expect(windowFake.location.href).toEqual("http://pizza-di-noccatello.it/online-trattoria/#/crazy/ingredients");
          done();
        });
    });     

    async.it("'navigateTo' should construct the correct target URL for an empty path", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["navigationService"], function (navigationService) {
          navigationService.navigateTo("#/");
          expect(windowFake.location.href).toEqual("http://pizza-di-noccatello.it/online-trattoria/");
          done();
        });
    });     

    async.it("'redirectTo' should call 'window.location.replace' the correct target URL", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["navigationService"], function (navigationService) {
          navigationService.redirectTo("crazy/ingredients");
          expect(windowFake.location.href).toEqual("http://pizza-di-noccatello.it/online-trattoria/#/crazy/ingredients");
          done();
        });
    });     

    async.it("'redirectTo' should call 'window.location.replace' the correct target URL for an unclean path", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["navigationService"], function (navigationService) {
          navigationService.redirectTo("/crazy/ingredients ");
          expect(windowFake.location.href).toEqual("http://pizza-di-noccatello.it/online-trattoria/#/crazy/ingredients");
          done();
        });
    });     

    async.it("'redirectTo' should call 'window.location.replace' the correct target URL for an empty path", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["navigationService"], function (navigationService) {
          navigationService.redirectTo("#");
          expect(windowFake.location.href).toEqual("http://pizza-di-noccatello.it/online-trattoria/");
          done();
        });
    });     

  });

});
