define(["knockout", "basket"], function (ko, basket) {

  var menuViewModel = {
    initialize: function () {
      if (basket.isCrazy()) {
        basket.reset();
      }
    }
  };

  return menuViewModel;

});
