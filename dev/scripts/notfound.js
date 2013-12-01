define(["knockout"], function (ko) {

  var NotFoundViewModel;

  NotFoundViewModel = function () {
    if (!(this instanceof NotFoundViewModel)) {
        return new NotFoundViewModel();
    }

    this.message = ko.observable("This message comes from NotFoundViewModel.");
  };

  return NotFoundViewModel;

});
