define(["knockout", "allaCarteMenu", "dataService", "basket"], function (ko, allaCarteMenu, dataService, basket) {

  var menuViewModel = {};

  menuViewModel.initialize = function (){
    if (basket.isCrazy()){
      basket.reset();
    }
  };

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
