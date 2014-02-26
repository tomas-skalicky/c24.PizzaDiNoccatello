define(["knockout", "dataService", "basket"], function (ko, dataService, basket) {
  var pizzas,
      isEmpty,
      selectPizza;

  pizzas = ko.observableArray();

  isEmpty = ko.computed(function () {
    return pizzas().length === 0;
  });

  selectPizza = function (pizza) {
    basket.addPizza(pizza);
  };

  if (isEmpty()) {
    dataService.getPizzas().then(pizzas);
  }

  return {
    pizzas: pizzas,
    isEmpty: isEmpty,
    selectPizza: selectPizza
  };
});
