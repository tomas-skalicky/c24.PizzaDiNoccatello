define(["knockout", "dataService", "basketSection"], function (ko, dataService, basket) {

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

  if (viewModel.isEmpty()) {
    dataService.getIngredients().then(viewModel.items);
  }

  return viewModel;
});
