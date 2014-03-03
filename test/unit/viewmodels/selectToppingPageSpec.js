define(["squire", "q"], function (Squire, Q) {

  describe("SelectToppingsPage" , function () {
    var selectToppingsPage,
        basket,
        dataServiceMock,
        navigationServiceMock,
        squire,
        async = new AsyncSpec(this);
   
    async.beforeEach(function (done) {
      dataServiceMock       = jasmine.createSpyObj("dataService", ["getIngredients"]);
      navigationServiceMock = jasmine.createSpyObj("navigationService", ["navigateTo"]);
      dataServiceMock.getIngredients.andReturn(Q.when([]));

      squire = new Squire();
      squire.mock("dataService", function () {
        return dataServiceMock;
      });
      
      squire.mock("navigationService", function () {
        return navigationServiceMock;
      });

      squire.require(["selectToppingsPage", "basketSection"], function (page, basketSection) {
        selectToppingsPage = page;
        basket             = basketSection;
        done();
      });
    });

    describe("When goToLayers is executed", function () {
      beforeEach(function () {
        selectToppingsPage.goToLayers();
      });

      it ("should navigate to the checkout page", function () {
        expect(navigationServiceMock.navigateTo).toHaveBeenCalledWith("#/crazy/layers");
      });

    });

    describe("When goToCheckout is executed", function () {
      beforeEach(function () {
        selectToppingsPage.goToCheckout();
      });

      it ("should navigate to the checkout page", function () {
        expect(navigationServiceMock.navigateTo).toHaveBeenCalledWith("#/checkout");
      });

    });

    describe("When the list for toppings is empty", function () {
      it ("Should return isEmpty true when the toppings menu is empty", function () {
        expect(selectToppingsPage.isEmpty()).toEqual(true);
      });
    });

    describe("When the selectToppingsPage contains any Topping", function () {
       beforeEach(function (){
         selectToppingsPage.items.push({name: "MyFavoriteTopping"});
       });

       it ("should return isEmpty false", function (){
         expect(selectToppingsPage.isEmpty()).toEqual(false);
       });

       describe("When a Topping has been selected", function () {
         beforeEach(function () {
           selectToppingsPage.selectItem({name: "MyFavoriteTopping"});
         });

         it ("should add the selected Topping to the basket", function (){
           expect(basket.hasToppings()).toEqual(true);
         });

       });

    });

    describe("When the basket is empty", function () {
      beforeEach(function () {
        basket.reset();
      });

      it ("Should return canGoToCheckout false", function () {
        expect(selectToppingsPage.canGoToCheckout()).toEqual(false);
      });

    });
   
    describe("When the basket contains one Layer", function () {
      beforeEach(function () {
        basket.addLayer({name: 'MyFavoriteLayer'});
      });

      it ("Should return canGoToCheckout false", function () {
        expect(selectToppingsPage.canGoToCheckout()).toEqual(false);
      });
    });

    describe("When the basket contains a Layer and at least a Topping", function () {
      beforeEach(function () {
        basket.addLayer({name: 'MyFavoriteLayer'});
        basket.addTopping({name: 'MyFavoriteTopping'});
      });

      it("Should return canSelectToppings true", function () {
        expect(selectToppingsPage.canGoToCheckout()).toEqual(true);
      });

      afterEach(function () {
        basket.reset();
      });
    });

  });

});
