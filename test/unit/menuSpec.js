define(["squire"], function (Squire) {

  describe("Menu", function () {

    describe("When initialized", function () {

      describe("when the basket is in crazy mode", function () {

        var async = new AsyncSpec(this),
            resetSpy = jasmine.createSpy("resetSpy"),
            basketMock = {
              isCrazy: function () {
                return true;
              },
              reset: resetSpy
            };

        async.beforeEach(function (done) {
          new Squire()
            .mock("basket", basketMock)
            .require(["menu"], function (menu) {
              menu.initialize();
              done();
            });
        });

        it ("should reset the basket", function () {
          expect(resetSpy).toHaveBeenCalled();
        });

      });

    });

  });

});
