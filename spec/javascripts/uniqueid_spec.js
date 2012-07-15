describe("UniqueID", function() {
    it("should generate globally-unique stream of ids", function() {
        var ids = [];
        var i = 0;
        Array.range(1, 100).map(function(id) {
            ids.push(id);
        });
        expect(ids.uniq().length).toEqual(ids.length);
    });
});