define(["module", "knockout"], function(module, ko) {
  function Page1ViewModel() {
    if (!(this instanceof Page1ViewModel)) {
        return new Page1ViewModel();
    }

    this.message = ko.observable("This message comes from Page1ViewModel.");
  }
  return Page1ViewModel;
});