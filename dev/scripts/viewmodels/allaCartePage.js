define(["knockout", "dataService", "basketSection"], function (ko, dataService, basket) {

  var viewModel = {
    initialize: function () {
      if (basket.isCrazy()) {
        basket.reset();
      }
    }
  };

  viewModel.items = ko.observableArray();

  viewModel.isEmpty = ko.computed(function () {
    return viewModel.items().length === 0;
  });

  viewModel.selectItem = function (item) {
    basket.addPizza(item);
  };

  viewModel.canGoToCheckout = function () {
    return basket.hasPizzas();
  };

  viewModel.goToCheckout = function () {
    window.location.href = "#/checkout";
  };

  if (viewModel.isEmpty()) {
    dataService.getPizzas().then(viewModel.items);
  }

  return viewModel;

});
