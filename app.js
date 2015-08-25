var sms = sms || {}; 
var active = active || {}; //instantiated objects 

//==== Model & Collection blueprints ========
sms.model = Backbone.Model.extend({
	initialize: function() {
		console.log('a model has been instantiated');
	}
}); 

sms.collection = Backbone.Collection.extend({ //instantiates models for us! 
																							// create + read 
	model: sms.model,   //what model to use on .create 
	initialize: function() {
		console.log('a collection has been instantiated');
	}
});
//=====END MODEL & COLLECTION BLUEPRINTS====
//******************************************
//======= View Blueprints ==================

sms.modelView = Backbone.View.extend({
	el: $('.list'),

	initialize: function() {
		console.log('a modelView has been instantiated');
		this.render(); //goes to render which will output on the page 
	},
	render: function() {
		var data = this.model.attributes; 
		var tpl = '<li> Sent from: ' + data.sender + '>> ' + data.message + '</li>'; //template
		this.$el.append(tpl); 
	}
}); 

sms.collectionView = Backbone.View.extend({
	events: {
		'click #create': 'render'  //click on button inside the 
															//section which was specified as el for collectionView $('.ui')
	},

	initialize: function() {
		console.log('a collectionView has been instantiated');
		// this.collection.on('sync') -- live with a server
		var that = this; //reference to collectionView
		this.collection.on('change', function() {
			//this inside block refers to collection (not the view)
			that.render(); //collectionView.render(); 
		});

	},
	render: function() {
		var collection = this.collection.models; //array where all the models are

		//loop through all models in our collection
		for (var model in collection) {
			//invoke initialize in modelView
			new sms.modelView({
				model: collection[model]
			});
		}
		console.log('ow!'); 
	}
}); 
//==== END VIEW BLUEPRINTS =================


//============ ACTIVE ======================

$(document).ready(function() {

	// INITIALIZE 
	active.collection = new sms.collection();
	active.collectionView = new sms.collectionView({
		el: $('.ui'), //the section for the collection 
		collection: active.collection 
	}); 
	// END INITIALIZE 

	$('#new').on('click', function() {
		// collection creates a model based on the model attribute
		// inside of the collection blueprint/class/def etc 
		active.collection.create({
			sender: 'Claire Boucher',
			message: 'drop your album already kthx'
		}); 
	});
});

