define(["squire", "q"], function (Squire, Q) {

    describe("On goCrazySelectLayer", function () {

        describe("when 'goCrazySelectLayer' viewmodel is created", function () {
          var selectLayerViewModel,
              dataServiceMock,
              injector,
              async = new AsyncSpec(this);
        });


        async.beforeEach(function (done){
            dataServiceMock = jasmine.createSpyObj("dataService", ["getLayers"]);
            dataServiceMock.getLayers.andReturn(Q.when([{}]));

            injector = new Squire();
            injector.mock("dataService", function () {
                return dataServiceMock;
            });
            
            injector.require(["goCrazySelectLayer"], function (selectLayerViewModel){
                done();
            });
        });

        it ("should call the express server", function () {
            expect(dataServiceMock.getLayers).toHaveBeenCalled();
        });
    });

});
