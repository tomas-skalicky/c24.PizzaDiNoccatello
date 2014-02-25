define(["menuSelectLayer", "basket"], function (menuSelectLayer, basket) {
  describe("When the menu for layers is empty", function () {
    it ("Should return isEmpty true when the layers menu is empty", function () {
      expect(menuSelectLayer.isEmpty()).toEqual(true);
    });
  });

  describe("When the menuSelectLayer contains any Layer", function () {
     beforeEach(function (){
       menuSelectLayer.addLayer({name: "MyFavoriteLayer"});
     });

     it ("should return isEmpty false", function (){
       expect(menuSelectLayer.isEmpty()).toEqual(false);
     });

     describe("When a Layer has been selected", function () {
       beforeEach(function () {
         menuSelectLayer.selectLayer({name: "MyFavoriteLayer"});
       });

       it ("should add the selected Layer to the basket", function (){
         expect(basket.hasLayer()).toEqual(true);
       });

     });

  });

});
