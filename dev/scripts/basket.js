define(["knockout", "utils"], function (ko, utils) {

  var items,
      total,
      isEmpty,
      hasPizzas,
      hasDough,
      hasToppings,
      isCrazy,
      reset,
      addPizza,
      removePizza,
      addDough,
      removeDough,
      addTopping,
      removeTopping,
      basketSort,
      hasItem,
      removeLastItem,
      ITEM_TYPE_PIZZA = 0,
      ITEM_TYPE_DOUGH = 1,
      ITEM_TYPE_TOPPING = 2;

  items = ko.observableArray([]);

  total = ko.computed(function () {
    return items().reduce(function (sum, item) {
      return sum + item.data.price;
    }, 0);
  });

  isEmpty = ko.computed(function () {
    return items().length === 0;
  });

  hasPizzas = ko.computed(function () {
    return items().some(function (item) {
      return item.type === ITEM_TYPE_PIZZA;
    });
  });

  hasDough = ko.computed(function () {
    return items().some(function (item) {
      return item.type === ITEM_TYPE_DOUGH;
    });
  });

  hasToppings = ko.computed(function () {
    return items().some(function (item) {
      return item.type === ITEM_TYPE_TOPPING;
    });
  });

  isCrazy = ko.computed(function () {
    return hasDough() || hasToppings();
  });

  reset = function () {
    items([]);
  };

  addPizza = function (pizza) {
    if (isCrazy()) {
      reset();
    }
    items.push({
      type: ITEM_TYPE_PIZZA,
      data: pizza
    });
    items.sort(basketSort);
  };

  removePizza = function (pizzaId) {
    return removeLastItem(ITEM_TYPE_PIZZA, pizzaId);
  };

  addDough = function (dough) {
    if (hasPizzas()) {
      reset();
    }
    removeDough(); // There can be only one!
    items.push({
      type: ITEM_TYPE_DOUGH,
      data: dough
    });
    items.sort(basketSort);
  };

  removeDough = function () {
    items.remove(function (item) {
      return item.type === ITEM_TYPE_DOUGH;
    });
  };

  addTopping = function (topping) {
    if (hasPizzas()) {
      reset();
    }
    if (hasItem(ITEM_TYPE_TOPPING, topping.id)) {
      return;
    }
    items.push({
      type: ITEM_TYPE_TOPPING,
      data: topping
    });
    items.sort(basketSort);
  };

  removeTopping = function (toppingId) {
    return removeLastItem(ITEM_TYPE_TOPPING, toppingId);
  };

  basketSort = function (item1, item2) {
    if (item1.type !== item2.type) {
      return item1.type < item2.type ? -1 : 1;
    }
    if (item1.data.name !== item2.data.name) {
      return item1.data.name < item2.data.name ? -1 : 1;
    }
    return 0;
  };

  hasItem = function (type, id) {
    return items().some(function (item) {
      return item.type === type && item.data.id === id;
    });
  };

  removeLastItem = function (type, id) {
    var index = utils.findLastIndex(items(), function (item) {
      return item.type === type && item.data.id === id;
    });
    if (index !== -1) {
      items.splice(index, 1);
      return true;
    }
    return false;
  };

  // Public API:
  return {
    items: items,
    total: total,
    isEmpty: isEmpty,
    hasPizzas: hasPizzas,
    hasDough: hasDough,
    hasToppings: hasToppings,
    isCrazy: isCrazy,
    reset: reset,
    addPizza: addPizza,
    removePizza: removePizza,
    addDough: addDough,
    removeDough: removeDough,
    addTopping: addTopping,
    removeTopping: removeTopping,
    ITEM_TYPE_PIZZA: ITEM_TYPE_PIZZA,
    ITEM_TYPE_DOUGH: ITEM_TYPE_DOUGH,
    ITEM_TYPE_TOPPING: ITEM_TYPE_TOPPING
  };

});
