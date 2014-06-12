define(["knockout", "dataService", "basketSection", "navigationService"], function (ko, dataService, basket, navigationService) {

  var viewModel = {
    initialize: function () {
      if (basket.isCrazy()) {
        basket.reset();
      }
    }
  };

  viewModel.items = ko.observableArray();

  viewModel.isEmpty = ko.computed(function () {
    return viewModel.items().length === 0;
  });

  viewModel.selectItem = function (item) {
    basket.addPizza(item);
  };

  viewModel.canGoToCheckout = function () {
    return basket.hasPizzas();
  };

  viewModel.goToCheckout = function () {
    navigationService.navigateTo("#/checkout");
  };

  if (viewModel.isEmpty()) {
    dataService.getPizzas().then(viewModel.items);
  }

  viewModel.searchPattern = ko.observable();

  viewModel.filteredItems = ko.computed(function () {
    if (!viewModel.searchPattern()) {
      return viewModel.items();
    } else {
      return ko.utils.arrayFilter(viewModel.items(), function (pizza) {
        return pizza.name.indexOf(viewModel.searchPattern()) > -1;
      });
    }
  });

  viewModel.DEFAULT_PIZZAS_PER_PAGE = 10;
  viewModel.START_PAGE_INDEX = 0;
  viewModel.currentPageIndex = ko.observable(0);

  viewModel.pizzasPerPage = viewModel.DEFAULT_PIZZAS_PER_PAGE;

  viewModel.pageCount = ko.computed(function() {
    if (viewModel.filteredItems().length === 0) {
      return 1;
    }

    return Math.ceil(viewModel.filteredItems().length / viewModel.pizzasPerPage);
  });

//  viewModel.selectPage = function(item){
//    viewModel.currentPageIndex = item.pageNumber;
//  };

  viewModel.pages = ko.computed(function(){
    var input = [],
      count = viewModel.pageCount();
    for (var i = 0; i < count; i += 1) input.push({'pageIndex': i});
    return input;
  });

  viewModel.currentPizzas = ko.computed(function () {
    var fixedPageIndex;

    if (viewModel.pageCount() <= viewModel.currentPageIndex()) {
      fixedPageIndex = viewModel.START_PAGE_INDEX;
    } else {
      fixedPageIndex = viewModel.currentPageIndex();
    }

    var firstPizzaIndex = fixedPageIndex * viewModel.pizzasPerPage;

    viewModel.currentPageIndex(fixedPageIndex);
    return viewModel.filteredItems().slice(firstPizzaIndex, firstPizzaIndex + viewModel.pizzasPerPage);
  });

  return viewModel;

});
