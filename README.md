# inverted-index

#### Implementation of the inverted index
  This impementation creates an index object in which meaningful words in a document are used as keys for the index object with each key's value being an array of the document the word is found.
#### What it does
An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears
#### How to use
  1. Include `inverted-index.js` into your html file
  2. Create a new file or you can use the same ` inverted-index.js` 
  3. Create an instance of the  *Index* object by using the `new ` keyword
      ``` var myIndex = new Index()```
  4. Now you can access the Index functions by using the dot operator.

#### Methods

* Adding files into the hashtble ` getBookData( filePath )` 

    This method uses `$.getJSON` to get all the data from a JSON file. Being an async function, make sure to use a call back to use its data...

    ```javascript
      myIndex.getBookData('books.json').done(function( data ){
          // get data here that will be passed to the createIndex function
      }); 
    ```

* Creating the index using the function` createIndex( data )` 

   This method can be used used to simply create an index object using the data from the function `getBookData()`. 
    It takes in data and returns an index object
    ``` javascript
        var index = myIndex.createIndex( data );
        /* will return => {
          key: [ document indices ]
        }
        */
     ```   
* You can also access the created index using ` myIndex.getIndex() ` 

* Searching the index object using the function` searchIndex( terms )` 

  This method can be used used to search for certain terms in the index object and returns a smaller object with just        those terms as object keys along with where they are found.
  The method can accept single strings, multi-word strings as well as an array of strings. It will return an error of the    word does not exost...
    ``` javascript
        var results = myIndex.searchIndex( 'string' || 'two strings' || [ 'array', 'of', 'strings' ] );
        /* will return => {
          key: [ document indices ]
        }
        */
     ```   




  
