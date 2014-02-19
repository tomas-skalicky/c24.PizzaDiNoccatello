define(["knockout", "allaCarteMenu", "dataService"], function (ko, allaCarteMenu, dataService) {

  var menuViewModel = {};

  menuViewModel.message = ko.observable("This message comes from MenuViewModel.");

  if (allaCarteMenu.isEmpty()) {
    dataService
      .getPizzas()
      .then(function (pizzas) {
        pizzas.forEach(function (pizza) {
          allaCarteMenu.addPizza(pizza);
        });
      });
  }

  return menuViewModel;

});
