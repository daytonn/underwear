describe("Arrays", function() {
    
    describe("arrays: first", function() {

        it("can pull out the first element of an array", function() {
            expect([1,2,3].first()).toEqual(1);
        });

        it("can pass an index to first", function() {
            expect([1,2,3].first(0).join(', ')).toEqual('');
        });
    });
    
});
