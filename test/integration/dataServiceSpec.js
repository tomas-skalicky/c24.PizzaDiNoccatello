define(["dataService", "q"], function (DataService, Q) {

  describe("On dataService", function () {

    describe("when 'getPizzas' is called", function () {

      var async = new AsyncSpec(this),
          failCallback,
          dataService,
          pizzas;

      async.beforeEach(function (done) {
        failCallback = jasmine.createSpy("failCallback");
        dataService = new DataService();
        dataService.getPizzas()
          .then(function (result) { pizzas = result; })
          .fail(failCallback)
          .done(function () { done(); });
      });

      afterEach(function () {
        failCallback = null;
        dataService = null;
        pizzas = null;
      });
 
      it("should return an array", function () {
        expect(failCallback).not.toHaveBeenCalled(); // Prerequisite!
        expect(Array.isArray(pizzas)).toBe(true);
      });
 
      it("should contain at least one item", function () {
        expect(failCallback).not.toHaveBeenCalled(); // Prerequisite!
        expect(pizzas.length).toBeGreaterThan(0);
      });

    });

  });

});
