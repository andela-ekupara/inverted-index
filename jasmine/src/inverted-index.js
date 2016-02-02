var Index = function() {

  this.index = {};
  this.data = [];

  // fetch data from books.json
  this.getBookData = function( filePath ) {
    return $.getJSON( filePath );
  };

  // takes data from the JSON file and creates an index from it
  this.createIndex = function( data ) {
    var self = this;
    // create index and return it as an object

    var bookData = data,
    		pattern = /[.',:]/gi;

    // remove punctuations
    var noPunct = removePunct( data );

    // remove stopwords
    var noStopWords = removeStopWords( noPunct );

    //remove duplicates
    var noDups = removeDuplicates( noStopWords );

    // create object with noDups as keys and an array for each showing
    // which document the key is found in
    for ( var i = 0; i < noDups.length; i++ ) {

        // initialize array as empty.
        self.index[ noDups[ i ] ] = [];
        var found = [];
        // use JSON data with objects who index j will be
        // pushed to the array found
        for ( var j = 0; j < bookData.length; j++ ) {
          var bookText = bookData[ j ].title.replace( pattern, '' )
          		.toLowerCase().split(' ')
              .concat( bookData[ j ].text.replace( pattern, '' )
              .toLowerCase().split(' ') );

          for ( var k = 0; k < bookText.length; k++ ) {
            // if the data from each document has the key value push it to found
            if ( bookText.indexOf( noDups[ i ] ) > -1 ) {
              found.push( j );
              // break the loop as the word exists in the document.
              break;
            }
          }
        }
        // set the index with noDups as the key and the array found as the value
        self.index[ noDups[ i ] ] = self.index[ noDups[ i ] ].concat( found );
    }
    // return the created index
    return self.index;
  };

  this.getIndex = function() {
      // returns the index of the content of the JSON file.
      return this.index;
  };

  this.searchIndex = function( searchTerms ) {
      // returns an  object showing the indices for each word in
      // the search terms parameter
      var indexResult = {},
          indexAsArray = Object.keys( this.index );
      var splitTerms;
      if ( typeof searchTerms == 'string' ){
        splitTerms = searchTerms.split(' ');
      }
      else{
        splitTerms = searchTerms;
      }
      // loop through array of search terms and check whether it exists
      // in the main index

      for( var i = 0; i < splitTerms.length; i++ ) {
        if ( indexAsArray.indexOf( splitTerms[ i ] ) == -1 ) {
        	indexResult[ splitTerms[ i ] ] = 'Error: the term couldn\'t be found';
        	break;
         }
        indexResult[ splitTerms[ i ] ] = this.index[ splitTerms[ i ] ];
      }
      return indexResult;
    };

  };

var removePunct = function( data ) {
var pattern = /[.',:]/gi;
  var noPunct = [],
      doc = [];

  // for every object in the array get all words and remove punctuations
  for( var inc = 0; inc < data.length; inc++ ) {

    doc = data[ inc ].title.replace( pattern, '' )
    	.toLowerCase().split(' ')
      .concat( data[ inc ].text.replace( pattern, '' )
      .toLowerCase().split(' ') );

      noPunct = noPunct.concat( doc );

  }
  // return the array of words sorted alphabetically
  return noPunct.sort();
};

var removeStopWords = function( data ) {
  var stopWords = [
    'a', 'about', 'above', 'again', 'against', 'all', 'am', 'an', 'and',
    'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being',
    'below', 'between', 'both', 'but', 'by', 'can', 'did', 'do', 'does',
    'doing', 'don', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
    'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself',
    'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its',
    'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not',
    'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours',
    'out', 'over', 'own', 's', 'same', 'she', 'should', 'so', 'some',
    'such', 't', 'than', 'that', 'the', 'their', 'theirs', 'them',
    'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too',
    'under', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where',
    'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'you', 'your',
    'yourself', 'yourselves'
  ];
    var noStopWords = [];
    for ( var i = 0; i < data.length; i++ ) {
        if ( stopWords.indexOf( data[ i ] ) < 0 ) {
            noStopWords.push( data[ i ] );
        }
    }
    return noStopWords;
};

var removeDuplicates = function( data ) {
    var noDuplicates = data;
    // if two or more consecutive words are similar remove one of them
    for ( var i = 0; i < noDuplicates.length; i++ ) {
        if ( noDuplicates[ i ] === noDuplicates[ i + 1 ] ) {
            noDuplicates.splice( i, 1 );
          }
    }
    return noDuplicates;
};
