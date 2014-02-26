define(["squire", "q"], function (Squire, Q) {

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
            .mock("basketSection", basketMock)
            .require(["allaCartePage"], function (menu) {
              menu.initialize();
              done();
            });
        });

        it ("should reset the basket", function () {
          expect(resetSpy).toHaveBeenCalled();
        });

      });

    });

    describe("When the menu is created", function () {
      var allaCartePage,
          basket,
          dataServiceMock,
          squire,
          async = new AsyncSpec(this);
     
      async.beforeEach(function (done) {
          dataServiceMock = jasmine.createSpyObj("dataService", ["getPizzas"]);
          dataServiceMock.getPizzas.andReturn(Q.when([]));

          squire = new Squire();
          squire.mock("dataService", function () {
              return dataServiceMock;
          });
          
          squire.require(["allaCartePage", "basketSection"], function (page, basketSection) {
              allaCartePage = page;
              basket = basketSection;
              done();
          });
      });

      describe("When the menu is empty", function () {
          it ("should return isEmpty true when the menu contains any pizza", function () {
              expect(allaCartePage.isEmpty()).toEqual(true);
          });
      });

      describe("When the menu contains pizzas", function () {
        beforeEach(function () {
          allaCartePage.items.push({ name: "Salami" });
        });

        it ("should return isEmpty false", function () {
          expect(allaCartePage.isEmpty()).toEqual(false);
        });

        describe("When a pizza has been selected", function () {
            beforeEach(function () {
                allaCartePage.selectItem({ name: "Salami" });
            });

            it ("should add the selected pizza to the basket", function () {
                expect(basket.hasPizzas()).toEqual(true);
            });
        });
      });

      it ("should call the express server", function () {
        expect(dataServiceMock.getPizzas).toHaveBeenCalled();
      });

    });

  });

});
