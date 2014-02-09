define(["allaCarteMenu", "basket"], function (allaCarteMenu, basket) {
    describe("When the menu is empty", function () {
        it ("should return isEmpty true when the menu contains any pizza", function () {
            expect(allaCarteMenu.isEmpty()).toEqual(true);
        });
    });

    describe("When the menu contains pizzas", function () {
        beforeEach(function () {
            allaCarteMenu.addPizza({name: "Salami" });
        });

        it ("should return isEmpty false", function () {
            expect(allaCarteMenu.isEmpty()).toEqual(false);
        });

        describe("When a pizza has been selected", function () {
            beforeEach(function () {
                allaCarteMenu.selectPizza ({name: "Salami"});
            });

            it ("should add the selected pizza to the basket", function () {
                expect(basket.hasPizzas()).toEqual(true);
            });
        });
    });
});
