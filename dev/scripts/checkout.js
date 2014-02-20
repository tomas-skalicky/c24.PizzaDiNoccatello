define(["knockout", "basket"], function (ko, basket) {

  var vm = {};

  vm.isClosed = ko.observable(false);
  vm.name = ko.observable("");
  vm.street = ko.observable("");
  vm.postalCode = ko.observable("");
  vm.city = ko.observable("");

  vm.canConfirm = ko.computed(function () {
      return !!(vm.name() && vm.street() && vm.postalCode() && vm.city() && !basket.isEmpty());
  });

  vm.confirm = function () {
      vm.isClosed(true);
  };

  return vm;

});
