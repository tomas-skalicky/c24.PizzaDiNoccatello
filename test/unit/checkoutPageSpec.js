define(["squire"], function (Squire) {

  describe("Checkout view model", function () {
    var async = new AsyncSpec(this),
        emptyBasket = { isEmpty: function () { return true; } },
        nonEmptyBasket = { isEmpty: function () { return false; } },
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
      async.it("should 'isClosed' to 'true'", function (done) {
        new Squire()
          .mock("basketSection", nonEmptyBasket)
          .require(["checkoutPage"], function (checkout) {
            setNameAndAddress(checkout);
            checkout.confirm();
            expect(checkout.isClosed()).toBe(true);
            done();
          });
      });
    });

  });

});
