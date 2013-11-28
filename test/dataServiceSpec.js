define(["squire", "q", "dataServiceHelper"], function (Squire, Q, dataServiceHelper) {

  describe("On dataService", function () {



    describe("when 'getPizzas' is called", function () {

      var pjSpy  = jasmine.createSpy("pjSpy").andReturn(Q.fulfill(dataServiceHelper.getPizzas())),
          async  = new AsyncSpec(this),
          pizzas = null;

      async.beforeEach(function (done) {
        new Squire()
          .mock("pajamas", function () { return pjSpy; })
          .require(["dataService"], function (dataService) {
              dataService.getPizzas()
                .then(function (result) { pizzas = result; })
                .fail(function (error) { console.error(error); })
                .done(function () { done(); });
          });
      });
 
      it("should resolve to an array of pizzas", function () {
        expect(Array.isArray(pizzas)).toBe(true);
      });
 
      it("should contain at least one item", function () {
        expect(pizzas.length).toBeGreaterThan(0);
      });

    });




  });

});
