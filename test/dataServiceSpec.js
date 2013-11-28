define(["squire", "q"], function (Squire, Q) {

  describe("On dataService", function () {


    // --- getPizzas -----------------------------------------------------------------------------v

    describe("when 'getPizzas' is called", function () {

      var promise = Q.fulfill([1, 2, 3, 4, 5]),
          async   = new AsyncSpec(this),
          dataService,
          pjSpy,
          pizzas;

      async.beforeEach(function (done) {
        pjSpy = jasmine.createSpy("pjSpy").andReturn(promise);
        new Squire()
          .mock("pajamas", function () { return pjSpy; })
          .require(["dataService"], function (DataService) {
              dataService = new DataService();
              dataService.getPizzas()
                .then(function (result) { pizzas = result; })
                .fail(function (error) { console.error(error); })
                .done(function () { done(); });
          });
      });

      afterEach(function () {
        dataService = null;
        pjSpy = null;
        pizzas = null;
      });
 
      it("should return an array", function () {
        expect(Array.isArray(pizzas)).toBe(true);
      });
 
      it("should contain at least one item", function () {
        expect(pizzas.length).toBeGreaterThan(0);
      });
 
      it("should return cached items if called repeatedly", function () {
        dataService.getPizzas().done(); // call it a second time...
        expect(pjSpy.calls.length).toBe(1); // the ajax mock should have been called just once.
      });

    });


    // --- getBasket -----------------------------------------------------------------------------v

    describe("when 'getBasket' is called", function () {

      var promise = Q.fulfill({ x: 0 }),
          async   = new AsyncSpec(this),
          dataService,
          pjSpy,
          basket;

      async.beforeEach(function (done) {
        pjSpy = jasmine.createSpy("pjSpy").andReturn(promise);
        new Squire()
          .mock("pajamas", function () { return pjSpy; })
          .require(["dataService"], function (DataService) {
              dataService = new DataService();
              dataService.getBasket(42)
                .then(function (result) { basket = result; })
                .fail(function (error) { console.error(error); })
                .done(function () { done(); });
          });
      });

      afterEach(function () {
        dataService = null;
        pjSpy = null;
        basket = null;
      });
 
      it("should return an object", function () {
        expect((typeof basket === "object") && (basket !== null) && !Array.isArray(basket)).toBe(true);
      });
 
      it("should make a web request for each call", function () {
        dataService.getBasket().done(); // call it a second time...
        expect(pjSpy.calls.length).toBe(2); // the ajax mock should have been called a second time.
      });

    });

  });

});
