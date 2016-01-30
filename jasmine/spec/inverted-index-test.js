describe("Tests for InvertedIndex Checkpoint", function() {
	var index = new Index();
	var bookData;
	
	beforeEach(function(done) {
		$.getJSON("spec/books.json").done(function(data) {
			
			bookData = data;
			done();
		});
  	});

	describe("Read book data", function() {
		it("The books.json file should not be empty", function() {
			// console.log(bookData);
		 	expect(typeof bookData).toBe("object");
			expect(bookData.length).not.toEqual(0);
		});
	});
	describe("Populate Index", function() {
		xit("creates an index", function() {
			
			expect(index.createIndex(filePath)).not.toBe({});
			
		});
		xit("creates the correct index", function() {
			//correct index
		});
	});
	describe("Search Index", function() {
		xit("returns indices for the provided search term", function() {
			//return indices for the search term
		});
	});
});