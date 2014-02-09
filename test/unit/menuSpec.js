define(["squire", "q"], function (Squire, Q) {
    describe("On menu alla Carte", function (){
        describe("When the menu is created", function () {
            var menuViewModel,
                dataServiceMock,
                injector,
                async = new AsyncSpec(this);
           
           async.beforeEach(function (done){
                dataServiceMock = jasmine.createSpyObj("dataService", ["getPizzas"]);
                dataServiceMock.getPizzas.andReturn(Q.when([{}]));

                injector = new Squire();
                injector.mock("dataService", function () {
                    return dataServiceMock;
                });
                
                injector.require(["menu"], function (MenuViewModel){
                    menuViewModel = new MenuViewModel ();
                    done();
                });
           });

            it ("should call the express server", function () {
                expect(dataServiceMock.getPizzas).toHaveBeenCalled();
            });
        });
    });
});
