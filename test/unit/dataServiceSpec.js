define(["squire", "q"], function (Squire, Q) {

  describe("On dataService", function () {

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
              dataService.getPizzas().done(function (result) {
                pizzas = result;
                done();
              });
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
 
      async.it("should not call the REST service another time if called repeatedly", function (done) {
        // call it a second time...
        dataService.getPizzas().done(function (result) {
          expect(pjSpy.calls.length).toBe(1); // the ajax mock should have been called just once.
          done();
        });
      });
 
      async.it("should return cached items if called repeatedly", function (done) {
        // call it a second time...
        dataService.getPizzas().done(function (result) {
          expect(result).toEqual(pizzas); // the result should be the pizza array from the first call.
          done();
        });
      });

    });

  });

});
