define(["squire"], function (Squire) {

  describe("router", function () {

    var async = new AsyncSpec(this),
        windowFake = null;

    beforeEach(function () {
      windowFake = {
        location: {
          href: "http://pizza-di-noccatello.it/online-trattoria/#/home",
          protocol: "http:",
          host: "pizza-di-noccatello.it",
          pathname: "/online-trattoria/",
          search: "",
          hash: "#/crazy/doughs",
          replace: function (newHref) {
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
        .require(["router"], function (router) {
          listeners.forEach(router.addListener);
          router.startListening();
          listeners.forEach(function (listener) {
            expect(listener).toHaveBeenCalledWith("crazy/doughs");
          });
          done();
        });
    });     

    async.it("should re-notify all registered listeners when the document fragment has changed", function (done) {
      var listeners = [ 1, 2, 3 ].map(jasmine.createSpy);
      new Squire()
        .mock("window", windowFake)
        .require(["router"], function (router) {
          listeners.forEach(router.addListener);
          router.startListening();
          windowFake.location.hash = "#/crazy/ingredients";
          windowFake._triggerEvent();
          listeners.forEach(function (listener) {
            expect(listener).toHaveBeenCalledWith("crazy/doughs");
            expect(listener).toHaveBeenCalledWith("crazy/ingredients");
          });
          done();
        });
    });     

    async.it("'getCurrentPath' should return a cleaned up path", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["router"], function (router) {
          expect(router.getCurrentPath()).toEqual("crazy/doughs");
          done();
        });
    });     

    async.it("'navigateTo' should construct the correct target URL", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["router"], function (router) {
          router.navigateTo("crazy/ingredients");
          expect(windowFake.location.href).toEqual("http://pizza-di-noccatello.it/online-trattoria/#/crazy/ingredients");
          done();
        });
    });     

    async.it("'navigateTo' should construct the correct target URL for an unclean path", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["router"], function (router) {
          router.navigateTo("#crazy/ingredients/");
          expect(windowFake.location.href).toEqual("http://pizza-di-noccatello.it/online-trattoria/#/crazy/ingredients");
          done();
        });
    });     

    async.it("'navigateTo' should construct the correct target URL for an empty path", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["router"], function (router) {
          router.navigateTo("#/");
          expect(windowFake.location.href).toEqual("http://pizza-di-noccatello.it/online-trattoria/");
          done();
        });
    });     

    async.it("'redirectTo' should call 'window.location.replace' the correct target URL", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["router"], function (router) {
          router.redirectTo("crazy/ingredients");
          expect(windowFake.location.href).toEqual("http://pizza-di-noccatello.it/online-trattoria/#/crazy/ingredients");
          done();
        });
    });     

    async.it("'redirectTo' should call 'window.location.replace' the correct target URL for an unclean path", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["router"], function (router) {
          router.redirectTo("/crazy/ingredients ");
          expect(windowFake.location.href).toEqual("http://pizza-di-noccatello.it/online-trattoria/#/crazy/ingredients");
          done();
        });
    });     

    async.it("'redirectTo' should call 'window.location.replace' the correct target URL for an empty path", function (done) {
      new Squire()
        .mock("window", windowFake)
        .require(["router"], function (router) {
          router.redirectTo("#");
          expect(windowFake.location.href).toEqual("http://pizza-di-noccatello.it/online-trattoria/");
          done();
        });
    });     

  });

});