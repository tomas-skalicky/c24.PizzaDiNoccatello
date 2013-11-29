define(["dataService", "q"], function (DataService, Q) {

  describe("On dataService", function () {


    // --- getPizzas -----------------------------------------------------------------------------v

    // NOTE: Only works if server implements CORS response headers
    //       (currently in feature/CORS branch -> issued pull request to Jan)

    describe("when 'getPizzas' is called", function () {

      var async   = new AsyncSpec(this),
          dataService,
          pizzas;

      async.beforeEach(function (done) {
        dataService = new DataService();
        dataService.getPizzas()
          .then(function (result) { pizzas = result; })
          .fail(function (error) { console.error(error); })
          .done(function () { done(); });
      });

      afterEach(function () {
        dataService = null;
        pizzas = null;
      });
 
      it("should return an array", function () {
        expect(Array.isArray(pizzas)).toBe(true);
      });
 
      it("should contain at least one item", function () {
        expect(pizzas.length).toBeGreaterThan(0);
      });

    });


    // --- getBasket -----------------------------------------------------------------------------v

    // NOTE: The final behavior of basket operations are subject to change, we do not use it yet.

    // describe("when 'getBasket' is called", function () {

    //   var async   = new AsyncSpec(this),
    //       dataService,
    //       basket;

    //   async.beforeEach(function (done) {
    //     dataService = new DataService();
    //     dataService.getBasket(42)
    //       .then(function (result) { basket = result; })
    //       .fail(function (error) { console.error(error); })
    //       .done(function () { done(); });
    //   });

    //   afterEach(function () {
    //     dataService = null;
    //     basket = null;
    //   });
 
    //   it("should return an object", function () {
    //     expect((typeof basket === "object") && (basket !== null) && !Array.isArray(basket)).toBe(true);
    //   });

    // });

  });

});
