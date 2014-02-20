define(["knockout", "dataService"], function (ko, dataService, undefined) {

  var goCrazySelectLayerViewModel = {};

  goCrazySelectLayerViewModel.availableDoughs = ko.observableArray();
  goCrazySelectLayerViewModel.selectedDough = ko.observable();

  goCrazySelectLayerViewModel.showSelectedDough = ko.computed(function () {
    return goCrazySelectLayerViewModel.selectedDough() !== undefined;
  });

  goCrazySelectLayerViewModel.selectedDoughDisplayText = ko.computed(function () {
    return (goCrazySelectLayerViewModel.selectedDough() !== undefined) ? gotCrazySelectLayerViewModel.selectedDough().name : '';
  });

  dataService.getDoughs().done(function (result) {
    goCrazySelectLayerViewModel.availableDoughs(result);
  });

  return goCrazySelectLayerViewModel;

});
