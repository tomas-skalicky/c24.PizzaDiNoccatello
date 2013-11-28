define(["pajamas"], function (pj) {

  var cache = {};

  return {
    getPizzas: function () {
      return pj({ url: "http://localhost:3000/api/pizzas", dataType: "json", type: "GET" });
    },
    getSizes: function () {
      // Return promises!
    },
    getDoughs: function () {
      // Return promises!
    },
    getIngredients: function () {
      // Return promises!
    },
    getBasket: function (id) {
      // Return promises!
    },
    setBasket: function (basket) {
      // Return promises!
    }
  };

});