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
    basket.addLayer(item);
  };

  if (viewModel.isEmpty()) {
    dataService.getLayers().then(viewModel.items);
  }

  return viewModel;
});