define(["knockout", "basket"], function (ko, basket) {

  var layers = ko.observableArray([]),
      addLayer,
      isEmpty,
      selectLayer;

  addLayer = function (layer) {
    layers.push(layer);
  };

  isEmpty = ko.computed(function () {
    return layers().length === 0;
  });

  selectLayer = function (layer) {
    basket.addLayer(layer);
  };

  return {
    layers : layers,
    addLayer : addLayer,
    isEmpty : isEmpty,
    selectLayer : selectLayer
  };
});
