define(["knockout", "utils"], function (ko, utils) {

  var items,
      total,
      isEmpty,
      hasPizzas,
      hasLayer,
      hasToppings,
      isCrazy,
      reset,
      addPizza,
      removePizza,
      addLayer,
      removeLayer,
      addTopping,
      removeTopping,
      cloneItem,
      removeItem,
      basketSort,
      hasItem,
      removeLastItem,
      ITEM_TYPE_PIZZA = 0,
      ITEM_TYPE_LAYER = 1,
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

  hasLayer = ko.computed(function () {
    return items().some(function (item) {
      return item.type === ITEM_TYPE_LAYER;
    });
  });

  hasToppings = ko.computed(function () {
    return items().some(function (item) {
      return item.type === ITEM_TYPE_TOPPING;
    });
  });

  isCrazy = ko.computed(function () {
    return hasLayer() || hasToppings();
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

  addLayer = function (layer) {
    if (hasPizzas()) {
      reset();
    }
    removeLayer(); // There can be only one!
    items.push({
      type: ITEM_TYPE_LAYER,
      data: layer
    });
    items.sort(basketSort);
  };

  removeLayer = function () {
    items.remove(function (item) {
      return item.type === ITEM_TYPE_LAYER;
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

  cloneItem = function (item) {
    items.push({
      type: item.type,
      data: item.data
    });
    items.sort(basketSort);
  };

  removeItem = function (item) {
    items.remove(item);
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
    hasLayer: hasLayer,
    hasToppings: hasToppings,
    isCrazy: isCrazy,
    reset: reset,
    addPizza: addPizza,
    removePizza: removePizza,
    addLayer: addLayer,
    removeLayer: removeLayer,
    addTopping: addTopping,
    removeTopping: removeTopping,
    cloneItem: cloneItem,
    removeItem: removeItem,
    ITEM_TYPE_PIZZA: ITEM_TYPE_PIZZA,
    ITEM_TYPE_LAYER: ITEM_TYPE_LAYER,
    ITEM_TYPE_TOPPING: ITEM_TYPE_TOPPING
  };

});
