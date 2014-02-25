define(["squire", "q", "allaCarteMenu", "basket"], function (Squire, Q, allaCarteMenu, basket) {
    describe("When the menu is empty", function () {
        it ("should return isEmpty true when the menu contains any pizza", function () {
            expect(allaCarteMenu.isEmpty()).toEqual(true);
        });
    });

    describe("When the menu contains pizzas", function () {
        beforeEach(function () {
            allaCarteMenu.pizzas.push({ name: "Salami" });
        });

        it ("should return isEmpty false", function () {
            expect(allaCarteMenu.isEmpty()).toEqual(false);
        });

        describe("When a pizza has been selected", function () {
            beforeEach(function () {
                allaCarteMenu.selectPizza ({ name: "Salami" });
            });

            it ("should add the selected pizza to the basket", function () {
                expect(basket.hasPizzas()).toEqual(true);
            });
        });
    });

    describe("On allaCarteMenu", function () {
        describe("When the menu is created", function () {
            var dataServiceMock,
                squire,
                async = new AsyncSpec(this);
           
            async.beforeEach(function (done) {
                dataServiceMock = jasmine.createSpyObj("dataService", ["getPizzas"]);
                dataServiceMock.getPizzas.andReturn(Q.when([{}]));

                squire = new Squire();
                squire.mock("dataService", function () {
                    return dataServiceMock;
                });
                
                squire.require(["allaCarteMenu"], function () {
                    done();
                });
            });

            it ("should call the express server", function () {
                expect(dataServiceMock.getPizzas).toHaveBeenCalled();
            });
        });
    });
});
