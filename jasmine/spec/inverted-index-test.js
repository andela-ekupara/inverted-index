describe('Tests for InvertedIndex Checkpoint', function() {
  var testIndex = new InvertedIndex();
  var bookData, index;

  beforeEach(function(done) {
    // get data from books.json
    testIndex.getBookData('books.json').done(function(data) {
      bookData = data;
      index = testIndex.createIndex(bookData);
      done();
    });
    spyOn(testIndex, 'createIndex').and.callThrough();
    });

  describe('Read book data', function() {
    // check that the data returned is not empty
    it('The books.json file should not be empty', function() {
      expect(bookData).toBeDefined();
      expect(typeof bookData).toBe('object');
      expect(bookData.length).not.toEqual(0);
    });
  });

  describe('Populate Index', function() {
    // check if the index is created as an object
    it('creates an index', function() {
      expect(index).toBeDefined();
      expect(typeof index).toBe('object');
      var indexKeys = Object.keys(index);
      expect(indexKeys.length).not.toBe(0);
      for(var key = 0; key < indexKeys.length; key++){
        expect(index.hasOwnProperty(indexKeys[key])).toBeTruthy();
        expect(Array.isArray(index[indexKeys[key]])).toBe(true);
      }
    });

    it('spy on the createIndex function', function(done) {
      //check whether the function is called...
      var thisIndex = new InvertedIndex();
      thisIndex.getBookData('books.json').done(function(data) {
        bookData = data;
        index = testIndex.createIndex(bookData);
        done();
      });
      expect(testIndex.createIndex).toHaveBeenCalled();
      expect(testIndex.createIndex).toHaveBeenCalledWith(bookData);
    });

    it('creates the correct index', function() {
      // index is an object, no punctuations or uppercases
      expect(typeof index).toBe('object');
      expect(Array.isArray(index.dragon)).toBeTruthy();
      expect(index.dragon).toEqual([ 2 ]) ;
      expect(index.dwarf).toEqual([0, 1, 2]);
      expect(index['.']).not.toBeDefined();
      expect(index.Alice).not.toBeDefined();
    });
  });

  describe('Search Index', function() {
    it('returns indices for the provided search term', function() {
      //return indices for the search term
      var results = testIndex.searchIndex('alice');
      expect(typeof results).toBe('object');
      expect(Array.isArray(results.alice)).toBeTruthy();
      expect(results.alice).toEqual([0]);
    });

    it('can handle a string with more than one word', function () {
      var results = testIndex.searchIndex('alice dwarf');
      expect(results.alice).toEqual([0]);
      expect(results.dwarf).toEqual([0, 1, 2]);
      expect(results).toEqual({
        'alice': [0],
        'dwarf': [0, 1, 2]
      });
    });

    it('can handle an array of strings', function () {
      var results = testIndex.searchIndex(['book', 'dwarf', 'alliance']);
      expect(results.book).toEqual([2]);
      expect(results.dwarf).toEqual([0, 1, 2]);
      expect(results.alliance).toEqual([1, 2]);
      expect(results).toEqual({
        'alliance': [1, 2],
        'book': [2],
        'dwarf': [0, 1, 2],
      });
    });

    it('should return an error if term does not exist', function() {
      var results = testIndex.searchIndex('haha');
      expect(results.haha)
        .toEqual('Error: the term couldn\'t be found');
    });

    it('does not take very long to search for a large array', function() {
      var terms = [
          'alice', 'rings', 'lord', 'wonderland',
          'enters', 'imagination', 'hole', 'rabbit',
          'world', 'elf', 'dwarf', 'hobbit', 'wizard',
          'destroy', 'ring', 'seek', 'alliance', 'man'
         ];
       // Start tracking time just before the function is called
      var start = performance.now();
      var results = testIndex.searchIndex(terms);
      // Check the time after the function is done
      var end = performance.now();
      // check that the correct results are returned
      expect(Object.keys(results).length).toBe(terms.length);
      // check that the time is below 1 ms
      expect(end - start).toBeLessThan(1);
    });
  });
});
