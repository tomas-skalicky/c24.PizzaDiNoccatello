define(["squire", "q"], function (Squire, Q) {

    describe("On goCrazySelectLayer", function () {

        describe("when 'goCrazySelectLayer' viewmodel is created", function () {

            var testDoughs = [{ "id": 1, "name": "Thin Crust", "price": 2 }, { "id": 2, "name": "Whole-grain bread", "price": 1.5 }, { "id": 3, "name": "white bread", "price": 1.75 }],
                promise = Q.fulfill(testDoughs),
                async = new AsyncSpec(this),
                goCrazySelectLayerViewModel,
                mockDataService = {};
            
                mockDataService.getDoughs = function () { return promise; };

            async.it("should not call the REST service another time if called repeatedly", function (done) {
                spyOn(mockDataService, 'getDoughs').andCallThrough();
                
                new Squire()
                .mock("dataService", function() { return mockDataService; })
                .require(["goCrazySelectLayer"], function (gotCrazySelectLayerViewModel) {
                    promise.done(function () {
                        expect(mockDataService.getDoughs).toHaveBeenCalled(); // the ajax mock should have been called.
                        done();
                    });
                });
            });
            
            async.it("the available doughs should be filled with the provided test doughs", function (done) {
                new Squire()
                .mock("dataService", function () { return mockDataService; })
                .require(["goCrazySelectLayer"], function (gotCrazySelectLayerViewModel) {
                    promise.done(function () {
                        expect(goCrazySelectLayerViewModel.availableDoughs().length).toBe(testDoughs.length); // the dataService mock should have been called just once.
                        done();
                    });
                });
            });

        });

    });

});
