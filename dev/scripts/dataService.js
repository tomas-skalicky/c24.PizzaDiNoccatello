define(["pajamas", "q"], function (pj, Q) {

  var DataService,
      baseUri = "http://localhost:3000/api/",
      cache = {};

  function getOrSetCachedItem (key, createFunc) {
    var entity = cache[key];
    if (entity && Q.isPromise(entity)) {
      if (!Q.isRejected(entity)) {
        return entity;
      } else {
        delete cache[entity];
      }
    }

    entity = createFunc();
    cache[key] = entity;
    return entity;
  }

  function webGet (entityName) {
    return pj({ url: baseUri + entityName, dataType: "json", type: "GET" });
  }

  function webPost (entityName, entity) {
    return pj({ url: baseUri + entityName, data: entity, dataType: "json", type: "POST" });
  }

  DataService = function () {
    if (!(this instanceof DataService)) {
      return new DataService();
    }
  };

  DataService.prototype = {
    getPizzas: function () {
      return getOrSetCachedItem("pizzas", function () { return webGet("pizzas"); });
    },
    getSizes: function () {
      return getOrSetCachedItem("sizes", function () { return webGet("sizes"); });
    },
    getDoughs: function () {
      return getOrSetCachedItem("basepizzas", function () { return webGet("basepizzas"); });
    },
    getIngredients: function () {
      return getOrSetCachedItem("ingredients", function () { return webGet("ingredients"); });
    },
    getBasket: function (id) {
      return webGet("basket/" + id); // We do not cache the basket
    },
    setBasket: function (basket) {
      return webPost("basket", basket); // We do not cache the basket
    }
  };

  return DataService;

});