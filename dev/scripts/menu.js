define(["knockout", "allaCarteMenu", "dataService", "basket"], function (ko, allaCarteMenu, dataService, basket) {

  var menuViewModel = {};

  menuViewModel.initialize = function (){
    if (basket.isCrazy()){
      basket.reset();
    }
  };

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
