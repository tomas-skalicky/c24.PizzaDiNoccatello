define(["knockout"], function (ko) {

  var CheckoutViewModel;

  CheckoutViewModel = function () {
    if (!(this instanceof CheckoutViewModel)) {
        return new CheckoutViewModel();
    }

    this.message = ko.observable("This message comes from CheckoutViewModel.");
  };

  return CheckoutViewModel;

});
