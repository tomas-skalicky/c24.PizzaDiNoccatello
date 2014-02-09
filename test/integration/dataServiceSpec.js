define(["dataService", "q"], function (dataService, Q) {

  describe("On dataService", function () {

    describe("when 'getPizzas' is called", function () {

      var async = new AsyncSpec(this),
          failCallback,
          pizzas;

      async.beforeEach(function (done) {
        failCallback = jasmine.createSpy("failCallback");
        dataService.getPizzas()
          .then(function (result) { pizzas = result; })
          .fail(failCallback)
          .done(function () { done(); });
      });

      afterEach(function () {
        failCallback = null;
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
