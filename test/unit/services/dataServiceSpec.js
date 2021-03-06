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
          .require(["dataService"], function (service) {
              dataService = service;
              dataService.getPizzas().done(function (result) {
                pizzas = result;
                done();
              });
          });
      });

      afterEach(function () {
        pjSpy  = null;
        pizzas = null;
      });
 
      it("should return an array", function () {
        expect(Array.isArray(pizzas)).toBe(true);
      });
 
      it("should contain at least one item", function () {
        expect(pizzas.length).toBeGreaterThan(0);
      });
      
      describe("When 'getPizzas' is called a second time", function() {
          async.it("should not call the REST service another time if called repeatedly", function (done) {
            dataService.getPizzas().done(function (result) {
              expect(pjSpy.calls.length).toBe(1); 
              done();
            });
          });
      }); 

      describe("When 'getPizzas' is called several times", function () {
        async.it("should return cached items if called repeatedly", function (done) {
          dataService.getPizzas().done(function (result) {
            expect(result).toBe(pizzas); 
            done();
          });
        });
      }); 

    });

  });

});
