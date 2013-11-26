require([], function () {

  describe("When I have two numbers x and y,", function() {
    var x, y;
    it("should result in 2 when I distract x from y, given x = 1 and y = 3.", function() {
      x = 1;
      y = 3;
      expect(y - x).toEqual(2);
    });
    it("should result in 0 when I distract x from y, given x = 5 and y = 5.", function() {
      x = 5;
      y = 5;
      expect(y - x).toEqual(0);
    });
    it("should result in -2 when I distract x from y, given x = 3 and y = 1.", function() {
      x = 3;
      y = 1;
      expect(y - x).toEqual(-2);
    });
  });

});
