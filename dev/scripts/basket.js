define(["knockout"], function (ko) {

  var items,
      total,
      reset,
      addPizza,
      removePizza,
      basketSort,
      findLastIndex,
      removeItemByDataId,
      ITEM_TYPE_PIZZA = 0,
      ITEM_TYPE_DOUGH = 1,
      ITEM_TYPE_TOPPING = 2;

  items = ko.observableArray([]);

  total = ko.computed(function () {
    return Array.prototype.reduce.call(items(), function (accu, item) {
      return accu + item.data.price;
    }, 0);
  });

  reset = function () {
    items([]);
  };

  addPizza = function (pizza) {
    items.push({
      type: ITEM_TYPE_PIZZA,
      data: pizza
    });
    items.sort(basketSort);
  };

  removePizza = function (pizzaId) {
    return removeItemByDataId(pizzaId);
  };

  basketSort = function (item1, item2) {
    if (item1.type !== item2.type) {
      return item1.type < item2.type ? -1 : 1;
    } else if (item1.data.name !== item2.data.name) {
      return item1.data.name < item2.data.name ? -1 : 1;
    } else {
      return 0;
    }
  };

  findLastIndex = function (array, predicate) {
    for (var i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i])) {
        return i;
      }
    }
    return -1;
  };

  removeItemByDataId = function (id) {
    var index = findLastIndex(items(), function (item) {
      return item.data.id === id;
    });
    if (index !== -1) {
      items.splice(index, 1);
      return true;
    } else {
      return false;
    }
  };

  // Public API:
  return {
    items: items,
    total: total,
    reset: reset,
    addPizza: addPizza,
    removePizza: removePizza
  };

});
