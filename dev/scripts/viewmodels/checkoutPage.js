define(["knockout", "basketSection"], function (ko, basket) {

  var viewModel = {};

  viewModel.initialize = function () {
    viewModel.isClosed(false);
  };

  viewModel.isClosed = ko.observable(false);
  viewModel.name = ko.observable("");
  viewModel.street = ko.observable("");
  viewModel.postalCode = ko.observable("");
  viewModel.city = ko.observable("");

  viewModel.canConfirm = ko.computed(function () {
      return !!(viewModel.name() && viewModel.street() && viewModel.postalCode() && viewModel.city() && !basket.isEmpty());
  });

  viewModel.confirm = function () {
      viewModel.isClosed(true);
  };

  return viewModel;

});
