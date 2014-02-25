define(["knockout", "menuSelectLayer", "dataService", "basket"], function (ko, menuSelectLayer, dataService, basket) {

  var selectLayerViewModel = {};

  selectLayerViewModel.initialize = function (){
    if (!basket.isCrazy()){
      basket.reset();
    }
  };

  selectLayerViewModel.message = ko.observable("This message comes from the goCrazyViewModel");
  
  if (menuSelectLayer.isEmpty()){
	dataService.getLayers()
             .then(function(layers){
                layers.forEach(function (layer) {
                  menuSelectLayer.addLayer(layer);
                });
             });
  }

  return selectLayerViewModel;

});
