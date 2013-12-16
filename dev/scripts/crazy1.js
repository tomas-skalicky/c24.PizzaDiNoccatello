define(["knockout", "dataService"], function (ko, DataService, undefined) {

    var crazy1ViewModel,
        dataService;

    crazy1ViewModel = function () {
        if (!(this instanceof crazy1ViewModel)) {
            return new crazy1ViewModel();
        }

        var self = this;
        
        self.availableDoughs = ko.observableArray();

        self.selectedDough = ko.computed(function () {
            return ko.utils.arrayFirst(self.availableDoughs(), function (item) {
                return item.id == id; //selected id will be a string
            });
        });
        
        self.showSelectedDough = ko.computed(function () {
            debugger;
            return self.selectedDough() !== undefined;
        });

        dataService = new DataService();
        dataService.getDoughs().done(function (result) {
            self.availableDoughs(result);
        });
    };

    return crazy1ViewModel;

});
