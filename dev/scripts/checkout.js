define(["knockout", "basket"], function (ko, basket) {

  var CheckoutViewModel;

  CheckoutViewModel = function () {
    if (!(this instanceof CheckoutViewModel)) {
        return new CheckoutViewModel();
    }

    this.isClosed = ko.observable(false);
    this.name = ko.observable("");
    this.street = ko.observable("");
    this.postalCode = ko.observable("");
    this.city = ko.observable("");
    this.canConfirm = ko.computed((function () {
        return this.name() && this.street() && this.postalCode() && this.city() && !basket.isEmpty();
    }).bind(this));
    this.confirm = (function () {
        this.isClosed(true);
    }).bind(this);
  };

  return CheckoutViewModel;

});
