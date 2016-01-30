
var Index = function() {
	this.index = new Object();
	this.data = [];
	
	
	
	this.createIndex = function(filePath) {
		var self = this;
		// create index and return it as an object
			//fetch data from books.json	
		$.getJSON(filePath, false, function(data){
			//cb(data);
			this.data = data;
			
			//remove punctuations
			var noPunct = removePunct(this.data);

			//remove stopwords
			var noStopWords = removeStopWords(noPunct);

			//remove duplicate
			var noDups = removeDuplicates(noStopWords);
			
			for(var i = 0; i < noDups.length-1; i++){
				self.index[noDups[i]] = 0;
			}
			




			console.log(self.index);
		});

		return self.index;
		
	}
	this.getIndex =  function() {
		//returns an object that is an accurate index of the content of the JSON file.
	};

	this.searchIndex = function(search_terms) {
		//returns an Array of numbers, each number representing the index (position) of an object in the JSON file.
	};
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
	for(var i = 0; i < data.length; i++) {
			if (stopWords.indexOf(data[i]) < 0){
				noStopWords.push(data[i]);
			}	
	}
	return noStopWords;
}
function removeDuplicates(data) {
	noDuplicates = data;
	for(var i = 0; i < noDuplicates.length; i++) {
		if(noDuplicates[i] === noDuplicates[i+1])
			noDuplicates.splice(i, 1);
	}
	return noDuplicates;
}

var myIndex = new Index();
myIndex.createIndex("../spec/books.json");
// console.log(JSONData);