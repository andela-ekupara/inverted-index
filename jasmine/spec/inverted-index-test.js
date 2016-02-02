describe("Tests for InvertedIndex Checkpoint", function() {
	var testIndex = new Index();
	var bookData, index;
	
	beforeEach(function(done) {
		// get data from books.json
		testIndex.getBookData("books.json").done(function(data) {
			bookData = data;
			index = testIndex.createIndex(bookData);
			done();
		});
  	});

	describe("Read book data", function() {
		it("The books.json file should not be empty", function() {
			expect(typeof bookData).toBe("object");
			expect(bookData.length).not.toEqual(0);
		});
	});
	describe("Populate Index", function() {
		it("creates an index", function() {
			expect(typeof index).toBe('object');
			expect(Object.keys(index).length).not.toBe(0);
			expect(index.hasOwnProperty('alice')).toBeTruthy();
			expect(Array.isArray(index['alice'])).toBe(true);
		});
		it("creates the correct index", function() {
			//correct index
			expect(typeof index).toBe('object');
			expect(Array.isArray(index['dragon'])).toBeTruthy();
			expect(index['dragon']).toEqual([2]);
			expect(index['dwarf']).toEqual([0, 1, 2]);
		});
	});
	describe("Search Index", function() {
		it("returns indices for the provided search term", function() {
			//return indices for the search term
			var results = testIndex.searchIndex('alice dwarf');
			expect(results['alice']).toEqual([0]);
			expect(results['dwarf']).toEqual([0, 1, 2]);
			expect(results).toEqual({
				'alice': [0],
				'dwarf': [0, 1, 2]
			})
		});
	});
});