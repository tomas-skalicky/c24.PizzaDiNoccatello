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
    basket.addLayer(item);
  };

  viewModel.canSelectToppings = function () {
    return basket.hasLayer();
  };

  viewModel.goToSelectToppings = function (){
    navigationService.navigateTo("#/crazy/ingredients");
  };

  if (viewModel.isEmpty()) {
    dataService.getLayers().then(viewModel.items);
  }
  return viewModel;
});
