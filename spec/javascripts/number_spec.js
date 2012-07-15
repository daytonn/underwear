describe("Number", function() {
    it("should call a function n times", function() {
        var count = 0;
        (3).times(function() {
            count += 1;
        });
        expect(count).toEqual(3);
    });
});