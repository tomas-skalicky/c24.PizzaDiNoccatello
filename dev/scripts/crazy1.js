define(["knockout", "dataService"], function (ko, dataService, undefined) {

  var crazy1ViewModel = {};

  crazy1ViewModel.availableDoughs = ko.observableArray();
  crazy1ViewModel.selectedDough = ko.observable();

  crazy1ViewModel.showSelectedDough = ko.computed(function () {
    return crazy1ViewModel.selectedDough() !== undefined;
  });

  crazy1ViewModel.selectedDoughDisplayText = ko.computed(function () {
    return (crazy1ViewModel.selectedDough() !== undefined) ? crazy1ViewModel.selectedDough().name : '';
  });

  dataService.getDoughs().done(function (result) {
    crazy1ViewModel.availableDoughs(result);
  });

  return crazy1ViewModel;

});
