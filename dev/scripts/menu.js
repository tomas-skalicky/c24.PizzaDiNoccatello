define(["knockout", "basket", "dataService"], function (ko, basket, dataService) {

  var MenuViewModel;

  MenuViewModel = function () {
    if (!(this instanceof MenuViewModel)) {
        return new MenuViewModel();
    }

    this.message = ko.observable("This message comes from MenuViewModel.");

    if (basket.isEmpty()) {
        var promise = dataService.getPizzas();
            promise.then(function (pizzas) {
            pizzas.forEach(function (pizza) {
              basket.addPizza(pizza);
             });
         });
    }
  };

  return MenuViewModel;

});
