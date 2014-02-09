define(["knockout", "basket"], function (ko, basket) {
   var pizzas = ko.observableArray([]),
       addPizza,
       isEmpty,
       selectPizza;

   addPizza = function (pizza) {
     pizzas.push(pizza);
   };

  isEmpty = ko.computed(function () {
    return pizzas().length === 0;
  });

  selectPizza = function (pizza) {
    basket.addPizza(pizza);
  };

   return {
     pizzas : pizzas,
     addPizza : addPizza,
     isEmpty : isEmpty,
     selectPizza : selectPizza
   };
});
