var DB_NAME = 'sfdtest1'; 

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/' + DB_NAME);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});


var definitionSchema = mongoose.Schema({
    term: String, 
    definition: String
}); 

var Definition = mongoose.model('Definition', definitionSchema); 


/** GET glossary Index **/

exports.index = function(req, res){

	var definitions = Definition.find(function(err, definitions){

		if(err){
			console.log(err); 
			return; 
		}
		console.log(definitions); 
		

	res.render('glossary', { 
		title: 'Sailing For Dummies: Glossary',
		defs : definitions
	});		

	});

 	
};

exports.addDefinition = function (req, res){


	var new_definition = new Definition({
		term : req.body.term, 
		definition: req.body.definition
	});


	new_definition.save(function(err) {

		if (err) {
			console.log(err); 
			res.json({
				status : 'bad'
			})
		}

		res.json({
			status : 'ok'
		})

	})
};