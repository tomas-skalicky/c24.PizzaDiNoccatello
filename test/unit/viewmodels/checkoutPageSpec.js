define(["squire"], function (Squire) {

  describe("Checkout view model", function () {
    var async          = new AsyncSpec(this),
        emptyBasket    = { isEmpty: function () { return true; } },
        nonEmptyBasket = { isEmpty: function () { return false; },
                           reset: function () {}
                         },
        setNameAndAddress = function (checkout) {
          checkout.name("Giaccomo Renaldo");
          checkout.street("Via della Batteria 2");
          checkout.postalCode("74859");
          checkout.city("Roma");
        };

    describe("when a new instance is created", function () {
      async.it("should have empty fields for the address", function (done) {
        new Squire()
          .mock("basketSection", nonEmptyBasket)
          .require(["checkoutPage"], function (checkout) {
            expect(checkout.name()).toBe("");
            expect(checkout.street()).toBe("");
            expect(checkout.postalCode()).toBe("");
            expect(checkout.city()).toBe("");
            done();
          });
      });
      async.it("should not be closed", function (done) {
        new Squire()
          .mock("basketSection", nonEmptyBasket)
          .require(["checkoutPage"], function (checkout) {
            expect(checkout.isClosed()).toBe(false);
            done();
          });
      });
      async.it("should not be confirmable", function (done) {
        new Squire()
          .mock("basketSection", nonEmptyBasket)
          .require(["checkoutPage"], function (checkout) {
            expect(checkout.canConfirm()).toBe(false);
            done();
          });
      });
    });

    describe("when all fields have values", function () {
      async.it("should not be confirmable for an empty basket", function (done) {
        new Squire()
          .mock("basketSection", emptyBasket)
          .require(["checkoutPage"], function (checkout) {
            setNameAndAddress(checkout);
            expect(checkout.canConfirm()).toBe(false);
            done();
          });
      });
      async.it("should be confirmable for a non-empty basket", function (done) {
        new Squire()
          .mock("basketSection", nonEmptyBasket)
          .require(["checkoutPage"], function (checkout) {
            setNameAndAddress(checkout);
            expect(checkout.canConfirm()).toBe(true);
            done();
          });
      });
    });

    describe("when the order is confirmed", function () {
      var basketSpy,
          checkoutPage;
      async.beforeEach(function (done) {
        basketSpy = spyOn(nonEmptyBasket, "reset");
        new Squire()
          .mock("basketSection", nonEmptyBasket)
          .require(["checkoutPage"], function (checkout) {
            checkoutPage = checkout;
            setNameAndAddress(checkout);
            checkout.confirm();
            done();
          });
      });

      it("should 'isClosed' to 'true'", function (done) {
            expect(checkoutPage.isClosed()).toBe(true);
      });

      it("should reset the basket when checkout is completed", function () {
          expect(nonEmptyBasket.reset).toHaveBeenCalled(); 
      });
      
    });

  });

});
