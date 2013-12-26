define(["squire", "basket", "knockout"], function (Squire, basket, ko) {

  describe("basket", function () {

    beforeEach(function () {
      basket.reset();
    });

    afterEach(function () {
      basket.reset();
    });

    it("should initially be empty", function () {
      expect(basket.items().length).toBe(0);
    });

    it("should initially have a total of 0", function () {
      expect(basket.total()).toBe(0);
    });

    it("should calculate length correctly after inserting pizzas", function () {
      for (var i = 0; i < 3; i++) {
        basket.addPizza({ id: "pm", name: "Margarita", price: 7 });
      }
      expect(basket.items().length).toBe(3);
    });

    it("should calculate total correctly after inserting pizzas", function () {
      for (var i = 0; i < 3; i++) {
        basket.addPizza({ id: "pm", name: "Margarita", price: 7 });
      }
      expect(basket.total()).toBe(21);
    });

    it("should calculate length correctly after removing pizzas", function () {
      for (var i = 0; i < 3; i++) {
        basket.addPizza({ id: "pm", name: "Margarita", price: 7 });
      }
      basket.removePizza("pm");
      expect(basket.items().length).toBe(2);
    });

    it("should calculate total correctly after removing pizzas", function () {
      for (var i = 0; i < 3; i++) {
        basket.addPizza({ id: "pm", name: "Margarita", price: 7 });
      }
      basket.removePizza("pm");
      expect(basket.total()).toBe(14);
    });

  });

});