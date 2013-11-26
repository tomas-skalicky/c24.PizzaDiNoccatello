define(["module", "knockout" /*, "navigationService" */], function(module, ko /*, navigationService */) {

  var Page1ViewModel;

  Page1ViewModel = function () {
    if (!(this instanceof Page1ViewModel)) {
        return new Page1ViewModel();
    }

    //if (notValidStartPoint) {
    //  navigationService.redirect("/sdgkljsfdkl");
    //}

    this.message = ko.observable("This message comes from Page1ViewModel.");
  };

  return Page1ViewModel;

});