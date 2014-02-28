define(["knockout", "dataService", "basketSection", "navigationService"], function (ko, dataService, basket, navigationService) {

  var viewModel = {
    initialize: function () {
      if (!basket.isCrazy()) {
        basket.reset();
      }
    }
  };

  viewModel.items = ko.observableArray();

  viewModel.isEmpty = ko.computed(function () {
    return viewModel.items().length === 0;
  });

  viewModel.selectItem = function (item) {
    basket.addTopping(item);
  };

  viewModel.canGoToCheckout = function () {
    return basket.hasLayer() && basket.hasToppings();
  };

  viewModel.goToCheckout = function () {
    navigationService.navigateTo("#/checkout");
  };

  if (viewModel.isEmpty()) {
    dataService.getIngredients().then(viewModel.items);
  }

  return viewModel;
});
