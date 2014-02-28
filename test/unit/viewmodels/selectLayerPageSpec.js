define(["squire", "q"], function (Squire, Q) {

  describe("SelectLayerPage" , function () {
    var selectLayerPage,
        basket,
        dataServiceMock,
        navigationServiceMock,
        squire,
        async = new AsyncSpec(this);
   
    async.beforeEach(function (done) {
      dataServiceMock = jasmine.createSpyObj("dataService", ["getLayers"]);
      navigationServiceMock = jasmine.createSpyObj("navigationService", ["navigateTo"]);
      dataServiceMock.getLayers.andReturn(Q.when([]));

      squire = new Squire();
      squire.mock("dataService", function () {
        return dataServiceMock;
      });
      
      squire.mock("navigationService", function () {
        return navigationServiceMock;
      });

      squire.require(["selectLayerPage", "basketSection"], function (page, basketSection) {
        selectLayerPage = page;
        basket = basketSection;
        done();
      });
    });

    describe("When goToSelectToppings is executed", function () {
      beforeEach(function () {
        selectLayerPage.goToSelectToppings();
      });

      it("Should navigate to the ingredients page", function () {
        expect(navigationServiceMock.navigateTo).toHaveBeenCalledWith ("#/crazy/ingredients");
      });
    });

    describe("When the list for layers is empty", function () {
      it ("Should return isEmpty true when the layers menu is empty", function () {
        expect(selectLayerPage.isEmpty()).toEqual(true);
      });
    });

    describe("When the selectLayerPage contains any Layer", function () {
       beforeEach(function (){
         selectLayerPage.items.push({name: "MyFavoriteLayer"});
       });

       it ("should return isEmpty false", function (){
         expect(selectLayerPage.isEmpty()).toEqual(false);
       });

       describe("When a Layer has been selected", function () {
         beforeEach(function () {
           selectLayerPage.selectItem({name: "MyFavoriteLayer"});
         });

         it ("should add the selected Layer to the basket", function (){
           expect(basket.hasLayer()).toEqual(true);
         });

       });

    });

    describe("When the basket is empty", function () {
      beforeEach(function () {
        basket.reset();
      });

      it ("Should return canSelectToppings false", function () {
        expect(selectLayerPage.canSelectToppings()).toEqual(false);
      });

    });
    
    describe("When the basket contains a Layer", function () {
      beforeEach(function () {
        basket.addLayer({name: 'CornLayer'});
      });

      it("Should return canSelectToppings true", function () {
        expect(selectLayerPage.canSelectToppings()).toEqual(true);
      });

      afterEach(function () {
        basket.reset();
      });
    });

  });

});
