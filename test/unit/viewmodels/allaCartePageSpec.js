define(["knockout", "squire", "q"], function (ko, Squire, Q) {

  describe("Menu", function () {

    describe("When initialized", function () {

      describe("when the basket is in crazy mode", function () {

        var async = new AsyncSpec(this),
            navigateToSpy = jasmine.createSpy("navigateToSpy"),
            navigationServiceMock = {
              navigateTo: navigateToSpy
            },
            resetSpy   = jasmine.createSpy("resetSpy"),
            basketMock = {
              isCrazy: function () {
                return true;
              },
              reset: resetSpy
            },
            allaCartePageViewModel;

        async.beforeEach(function (done) {
          new Squire()
            .mock("basketSection"      , basketMock)
            .mock("navigationService"  , navigationServiceMock)
            .require(["allaCartePage"] , function (menu) {
              allaCartePageViewModel = menu;
              allaCartePageViewModel.initialize();
              done();
            });
        });

        it ("should reset the basket", function () {
          expect(resetSpy).toHaveBeenCalled();
        });

        describe("When goToCheckout is executed", function () {
          beforeEach(function () {
            allaCartePageViewModel.goToCheckout();
          });

          it ("should call the navigateTo function from the navigationService", function () {
            expect(navigateToSpy).toHaveBeenCalled();
          });
        });

      });

    });

    describe("When the menu is created", function () {
      var allaCartePage,
          basket,
          dataServiceMock,
          squire,
          async = new AsyncSpec(this);
     
      async.beforeEach(function (done) {
          dataServiceMock = jasmine.createSpyObj("dataService", ["getPizzas"]);
          dataServiceMock.getPizzas.andReturn(Q.when([]));

          squire = new Squire();
          squire.mock("dataService", function () {
              return dataServiceMock;
          });
          
          squire.require(["allaCartePage", "basketSection"], function (page, basketSection) {
              allaCartePage = page;
              basket        = basketSection;
              done();
          });
      });

      describe("When the menu is empty", function () {
          it ("should return isEmpty true when the menu contains any pizza", function () {
              expect(allaCartePage.isEmpty()).toEqual(true);
          });
      });

      describe("When the menu contains pizzas", function () {
        beforeEach(function () {
          allaCartePage.items.push({ name: "Salami" });
        });

        it ("should return isEmpty false", function () {
          expect(allaCartePage.isEmpty()).toEqual(false);
        });

        describe("When a pizza has been selected", function () {
            beforeEach(function () {
                allaCartePage.selectItem({ name: "Salami" });
            });

            it ("should add the selected pizza to the basket", function () {
                expect(basket.hasPizzas()).toEqual(true);
            });
        });
      });

      it ("should call the express server", function () {
        expect(dataServiceMock.getPizzas).toHaveBeenCalled();
      });

      describe("When the basket is empty", function () {
        beforeEach(function () {
          basket.reset();          
        });
        it("Should return canGoToCheckout false", function () {
          expect(allaCartePage.canGoToCheckout()).toEqual(false);
        });
      });

      describe("When the basket has a Pizza", function () {
        beforeEach(function () {
          basket.addPizza({name: 'Salami'});
        });

        it("Should return canGoToCheckout true", function () {
          expect(allaCartePage.canGoToCheckout()).toEqual(true);
        });

        afterEach(function () {
          basket.reset();
        });
      });

    });


    describe('When calling getPageCount', function () {
      var squire,
        allaCartePageViewModel,
        async = new AsyncSpec(this),
        dataServiceMock = jasmine.createSpyObj("dataService", ["getPizzas"]),
        resetSpy   = jasmine.createSpy("resetSpy"),
        basketMock = {
          isCrazy: function () {
            return true;
          },
          reset: resetSpy
        },
        pizzas =  [
          { id: 1, name: 'Thin Crust 1' }
        ];

      async.beforeEach(function(done) {
        dataServiceMock.getPizzas.andReturn(Q.when(pizzas));

        squire = new Squire()
        .mock("dataService"        , dataServiceMock)
        .mock("basketSection"      , basketMock)
        .mock("navigationService"  , {})
        .require(["allaCartePage"] , function (menu) {
          allaCartePageViewModel = menu;
          allaCartePageViewModel.initialize();
          done();
        });
      });

      describe('without any pizzas', function () {
        it('should return 1 page', function () {
          allaCartePageViewModel.items([]);

          expect(allaCartePageViewModel.pageCount()).toBe(1);
        });
      });

      describe('with one pizza', function () {
        it('should return 1 page', function () {
          expect(allaCartePageViewModel.pageCount()).toBe(1);
        });
      });

      describe('with 3 pizzas and pizzasPerPage equal 2', function () {
        it('should return 2 pages', function () {
          allaCartePageViewModel.pizzasPerPage = 2;
          allaCartePageViewModel.items([
            { id: 1, name: 'Thin Crust 1' },
            { id: 2, name: 'Thin Crust 2' },
            { id: 3, name: 'Thin Crust 3' }
          ]);
          expect(allaCartePageViewModel.pageCount()).toBe(2);
        });
      });
    });

    describe('When a User wants to select a page', function () {

      var squire,
        allaCartePageViewModel,
        async = new AsyncSpec(this),
        dataServiceMock = jasmine.createSpyObj("dataService", ["getPizzas"]),
        resetSpy   = jasmine.createSpy("resetSpy"),
        basketMock = {
          isCrazy: function () {
            return true;
          },
          reset: resetSpy
        },
        pizzas = [
          { id: 1, name: 'Thin Crust 1' },
          { id: 2, name: 'Thin Crust 2' },
          { id: 3, name: 'Thin Crust 3' }
        ],
        filteredItems = ko.computed(function () { return pizzas; }),
        pageCountWasCalled;

      async.beforeEach(function(done) {
        dataServiceMock.getPizzas.andReturn(Q.when(pizzas));
        pageCountWasCalled = false;

        squire = new Squire()
          .mock("dataService"        , dataServiceMock)
          .mock("basketSection"      , basketMock)
          .mock("navigationService"  , {})
          .require(["allaCartePage"] , function (menu) {
            allaCartePageViewModel = menu;
            allaCartePageViewModel.initialize();
            allaCartePageViewModel.pizzasPerPage = 2;
            allaCartePageViewModel.pageCount = ko.computed(function() {
              pageCountWasCalled = true;
              return 2;
            });
            done();
          });
      });

      describe('selecting page 1', function () {
        it('currentPizzasList should contain the first two pizzas', function () {
          allaCartePageViewModel.currentPageIndex(0);
          expect(allaCartePageViewModel.currentPageIndex()).toBe(0);
          expect(filteredItems()[0].name).toBe('Thin Crust 1');

          expect(allaCartePageViewModel.currentPizzas()[0]).toEqual(filteredItems()[0]);
          expect(allaCartePageViewModel.currentPizzas()[1]).toEqual(filteredItems()[1]);
          expect(allaCartePageViewModel.currentPizzas().length).toBe(2);

          expect(pageCountWasCalled).toBe(true);
        });
      });

      describe('selecting page 2', function () {
        it('currentPizzasList should contain the last pizza', function () {
          allaCartePageViewModel.currentPageIndex(1);

          expect(allaCartePageViewModel.currentPageIndex()).toBe(1);

          expect(allaCartePageViewModel.currentPizzas()[0]).toEqual(filteredItems()[2]);
          expect(allaCartePageViewModel.currentPizzas().length).toBe(1);

          expect(pageCountWasCalled).toBe(true);



        });
      });

      describe('selecting page 3', function () {
        it('currentPizzasList should contain the same pizzas like page 1', function () {
          allaCartePageViewModel.currentPageIndex(2);
          expect(allaCartePageViewModel.currentPageIndex()).toBe(0);

          expect(allaCartePageViewModel.currentPizzas()[0]).toEqual(filteredItems()[0]);
          expect(allaCartePageViewModel.currentPizzas()[1]).toEqual(filteredItems()[1]);
          expect(allaCartePageViewModel.currentPizzas().length).toBe(2);

          expect(pageCountWasCalled).toBe(true);
        });
      });
    });

  });

});
