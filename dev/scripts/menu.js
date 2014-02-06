define(["knockout", "basket", "allaCarteMenu", "dataService"], function (ko, basket, allaCarteMenu, dataService) {

  var MenuViewModel;

  MenuViewModel = function () {
    if (!(this instanceof MenuViewModel)) {
        return new MenuViewModel();
    }

    this.message = ko.observable("This message comes from MenuViewModel.");

    if (allaCarteMenu.isEmpty()) {
       dataService.getPizzas()
	          .then(function (pizzas){
		      pizzas.forEach(function (pizza){
		         allaCarteMenu.addPizza(pizza);
		      });
		  });
    }
  };

  return MenuViewModel;

});
