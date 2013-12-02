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
 
      async.it("should return cached items if called repeatedly", function (done) {
        // call it a second time...
        dataService.getPizzas().done(function (result) {
          expect(pjSpy.calls.length).toBe(1); // the ajax mock should have been called just once.
          expect(result).toEqual(pizzas); // the result should be the pizza array from the first call.
          done();
        });
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
 
      async.it("should make a web request for each call", function (done) {
        // call it a second time...
        dataService.getBasket().done(function (result) {
          expect(pjSpy.calls.length).toBe(2); // the ajax mock should have been called a second time.
          done();
        });
      });

    });

  });

});
