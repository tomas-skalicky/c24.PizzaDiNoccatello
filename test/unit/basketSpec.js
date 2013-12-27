define(["squire", "basket", "knockout"], function (Squire, basket, ko) {

  describe("basket", function () {

    beforeEach(function () {
      basket.reset();
    });

    afterEach(function () {
      basket.reset();
    });

    describe("when nothing has been inserted", function () {
      it("should be empty", function () {
        expect(basket.isEmpty()).toBe(true);
      });
      it("should have a total of 0", function () {
        expect(basket.total()).toBe(0);
      });
      it("should not have dough", function () {
        expect(basket.hasDough()).toBe(false);
      });
      it("should not have toppings", function () {
        expect(basket.hasToppings()).toBe(false);
      });
      it("should not be crazy", function () {
        expect(basket.isCrazy()).toBe(false);
      });
    });

    describe("when pizzas have been inserted", function () {
      beforeEach(function () {
        basket.addPizza({ id: "pqs", name: "Quattro Stagioni", price: 8.5 });
        basket.addPizza({ id: "pm", name: "Margarita", price: 7 });
        basket.addPizza({ id: "ps", name: "Salame", price: 8 });
      });
      it("should not be empty", function () {
        expect(basket.isEmpty()).toBe(false);
      });
      it("should calculate length correctly", function () {
        expect(basket.items().length).toBe(3);
      });
      it("should calculate total correctly", function () {
        expect(basket.total()).toBe(23.5);
      });
      it("should not have dough", function () {
        expect(basket.hasDough()).toBe(false);
      });
      it("should have pizzas", function () {
        expect(basket.hasPizzas()).toBe(true);
      });
      it("should not have toppings", function () {
        expect(basket.hasToppings()).toBe(false);
      });
      it("should not be crazy", function () {
        expect(basket.isCrazy()).toBe(false);
      });
      it("should calculate length correctly after removing pizzas", function () {
        basket.removePizza("pm");
        expect(basket.items().length).toBe(2);
      });
      it("should calculate total correctly after removing pizzas", function () {
        basket.removePizza("pqs");
        expect(basket.total()).toBe(15);
      });
      it("should sort pizza items by name", function () {
        expect(basket.items()[0].data.name).toEqual("Margarita");
        expect(basket.items()[1].data.name).toEqual("Quattro Stagioni");
        expect(basket.items()[2].data.name).toEqual("Salame");
      });
    });

    describe("when dough has been inserted", function () {
      beforeEach(function () {
        basket.addDough({ id: "dw", name: "Wheat", price: 2.5 });
      });
      it("should not be empty", function () {
        expect(basket.isEmpty()).toBe(false);
      });  
      it("should calculate length correctly", function () {
        expect(basket.items().length).toBe(1);
      });
      it("should calculate total correctly", function () {
        expect(basket.total()).toBe(2.5);
      });
      it("should not have pizzas", function () {
        expect(basket.hasPizzas()).toBe(false);
      });
      it("should have dough", function () {
        expect(basket.hasDough()).toBe(true);
      });
      it("should not have toppings", function () {
        expect(basket.hasToppings()).toBe(false);
      });
      it("should be crazy", function () {
        expect(basket.isCrazy()).toBe(true);
      });
      it("should calculate length correctly after removing dough", function () {
        basket.removeDough();
        expect(basket.items().length).toBe(0);
      });
      it("should calculate total correctly after removing dough", function () {
        basket.removeDough();
        expect(basket.total()).toBe(0);
      });
      it("should have only one dough after inserting another dough", function () {
        basket.addDough({ id: "dgf", name: "Gluten free", price: 4.5 });
        expect(basket.items().length).toBe(1);
        expect(basket.items()[0].data.name).toBe("Gluten free");
      });
    });

    describe("when toppings have been inserted", function () {
      beforeEach(function () {
        basket.addTopping({ id: "tt", name: "Tomatoes", price: 1.5 });
        basket.addTopping({ id: "ts", name: "Salame", price: 2.5 });
        basket.addTopping({ id: "tm", name: "Mozzarella", price: 3 });
      });
      it("should not be empty", function () {
        expect(basket.isEmpty()).toBe(false);
      });
      it("should calculate length correctly", function () {
        expect(basket.items().length).toBe(3);
      });
      it("should calculate total correctly", function () {
        expect(basket.total()).toBe(7);
      });
      it("should not have pizzas", function () {
        expect(basket.hasPizzas()).toBe(false);
      });
      it("should not have dough", function () {
        expect(basket.hasDough()).toBe(false);
      });
      it("should have toppings", function () {
        expect(basket.hasToppings()).toBe(true);
      });
      it("should be crazy", function () {
        expect(basket.isCrazy()).toBe(true);
      });
      it("should calculate length correctly after removing toppings", function () {
        basket.removeTopping("ts");
        expect(basket.items().length).toBe(2);
      });
      it("should calculate total correctly after removing toppings", function () {
        basket.removeTopping("ts");
        expect(basket.total()).toBe(4.5);
      });
    });

  });

});
