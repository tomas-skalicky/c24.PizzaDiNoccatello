define(["knockout", "dataService"], function (ko, DataService, undefined) {

    var crazy1ViewModel,
        dataService;

    crazy1ViewModel = function () {
        if (!(this instanceof crazy1ViewModel)) {
            return new crazy1ViewModel();
        }

        var self = this;

        self.availableDoughs = ko.observableArray();
        self.selectedDough = ko.observable();

        self.showSelectedDough = ko.computed(function () {
            return self.selectedDough() !== undefined;
        });
        
        self.selectedDoughDisplayText = ko.computed(function () {
            return (self.selectedDough() !== undefined) ? self.selectedDough().name : '';
        });

        dataService = new DataService();
        dataService.getDoughs().done(function (result) {
            self.availableDoughs(result);
        });
    };

    return crazy1ViewModel;

});
