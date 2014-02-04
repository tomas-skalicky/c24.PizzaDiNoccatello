define(["knockout", "basket"], function (ko, basket) {

  var MenuViewModel;

  MenuViewModel = function () {
    if (!(this instanceof MenuViewModel)) {
        return new MenuViewModel();
    }

    this.message = ko.observable("This message comes from MenuViewModel.");

    // For testing purposes:
    if (basket.isEmpty()) {
        basket.addPizza({ id: "pqs", name: "Quattro Stagioni", price: 8.5 });
        basket.addPizza({ id: "pqs", name: "Quattro Stagioni", price: 8.5 });
        basket.addPizza({ id: "pm", name: "Margarita", price: 7 });
        basket.addPizza({ id: "ps", name: "Salame", price: 8 });
    }

  };

  return MenuViewModel;

});
