define([], function() {

  var cache = {},
      DataService;

  DataService = function () {
    if (!(this instanceof DataService)) {
      return new DataService();
    }
  };

  DataService.prototype = {
    getPizzas: function () {
      // Return promises!
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

  return DataService;

});