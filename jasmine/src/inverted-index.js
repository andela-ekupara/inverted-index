Index = function(){

    this.index  = {};
    this.data = [];



    this.createIndex =  function(filePath) {
        var self = this;
        // create index and return it as an object
        //fetch data from books.json	
        $.getJSON(filePath, false, function(data) {

            this.data = data;

            //remove punctuations
            var noPunct = removePunct(this.data);

            //remove stopwords
            var noStopWords = removeStopWords(noPunct);

            //remove duplicates
            var noDups = removeDuplicates(noStopWords);


            var pattern = /[.',:]/gi;

            // create object with noDups as keys and an array for each showing which document
            // they key is found in
            for (var i = 0; i < noDups.length; i++) {

                // initialize array as empty.
                self.index[noDups[i]] = [];
                var found = [];
                // use JSON data with objects who index j will be pushed to the array found
                for (var j = 0; j < this.data.length; j++) {
                    var bookText = this.data[j].title.replace(pattern, '').toLowerCase().split(' ')
                        .concat(this.data[j].text.replace(pattern, '').toLowerCase().split(' '));

                    for (var k = 0; k < bookText.length; k++) {
                        // if the data from each document has the key value push it to found	
                        if (bookText.indexOf(noDups[i]) > -1) {
                            found.push(j);
                            // break the loop as the word exists in the document.
                            break;
                        }
                    }

                }
                // set the index with noDups as the key and the array found as the value
                self.index[noDups[i]] = self.index[noDups[i]].concat(found);
                //obj = self.index;		
            }

            console.log(self.index);
            return self.index;
            //cb(self.getIndex(self.index));
        });
    };

    this.getIndex = function() {
        //returns an object that is an accurate index of the content of the JSON file.
        //this.index = ind;
        //var self = this;
        return this.createIndex();
    };

    // this.searchIndex = function(search_terms) {
    //     //returns an Array of numbers, each number representing the index (position) of an object in the JSON file.
    // };
};

function removePunct(data) {
    var pattern = /[.',:]/gi;
    var doc1 = data[0].title.replace(pattern, '').toLowerCase().split(' ')
        .concat(data[0].text.replace(pattern, '').toLowerCase().split(' '));
    var doc2 = data[1].title.replace(pattern, '').toLowerCase().split(' ')
        .concat(data[1].text.replace(pattern, '').toLowerCase().split(' '));

    var noPunct = doc1.concat(doc2).sort();

    return noPunct;
}


function removeStopWords(data) {
    stopWords = [
        'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
        'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being',
        'below', 'between', 'both', 'but', 'by', 'can', 'did', 'do', 'does',
        'doing', 'don', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
        'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself',
        'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its',
        'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not',
        'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours',
        'ourselves', 'out', 'over', 'own', 's', 'same', 'she', 'should', 'so', 'some',
        'such', 't', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves',
        'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too',
        'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where',
        'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'you', 'your', 'yours',
        'yourself', 'yourselves'
    ];
    var noStopWords = [];
    for (var i = 0; i < data.length; i++) {
        if (stopWords.indexOf(data[i]) < 0) {
            noStopWords.push(data[i]);
        }
    }
    return noStopWords;
}

function removeDuplicates(data) {
    noDuplicates = data;
    for (var i = 0; i < noDuplicates.length; i++) {
        if (noDuplicates[i] === noDuplicates[i + 1])
            noDuplicates.splice(i, 1);
    }
    return noDuplicates;
}
var m = new Index();
m.createIndex('../spec/books.json');
console.log(m.index);
