/**
* PostController
*
* @description :: Server-side logic for managing Posts
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/


var Firebase = require("firebase");
var ref = new Firebase(sails.config.globals.ref_firebase);
var postsRef = ref.child("posts");
var moment = require('moment');

module.exports = {

	'/':function(req, res){
		var i;
		postsRef.orderByValue().on("value", function(snapshot) {
			sails.log("i = "+i);
			i = 0;
			var resultsFirebase = [];
			snapshot.forEach(function(data) {
				resultsFirebase[i] = {};
				resultsFirebase[i].title = data.val().title;
				resultsFirebase[i].description = data.val().description;
				resultsFirebase[i].author = data.val().author;
				resultsFirebase[i].imagePresents = data.val().imagePresents;
				resultsFirebase[i].imageData = data.val().imageData;
				sails.log("title: "+data.val().title+" i: "+i);
				i += 1;
			});
			resultsFirebase.reverse();
			sails.log("After resultsFirebase.reverse();");
			res.view('posts/posts',{
				posts: resultsFirebase,
			});
		});
	},

	'new': function(req, res){
		res.view('posts/new');
	},

	'send': function(req, res){
		var title = req.param("title");
		var text = req.param("description");
		sails.log("title = "+title+" description = "+text);
		var newPostRef = postsRef.push();
		var date = moment().format("DD-MM-YYYY");
		var timestamp = moment().unix();
		sails.log("timestamp = "+timestamp);
		var timestampInverse = Number.MAX_SAFE_INTEGER - timestamp;
		sails.log("timestamp inverse = "+timestampInverse);

		var fileElement =  req.file('picture');
		fileElement.upload(function onUploadComplete (err, files) {
			if (err) return res.redirect('/post');;
			var file = files[0];
			if (file !== undefined){
				sails.log("photo");
				sails.log(file);
				var filePath = file.fd;
				sails.log("file path = "+filePath);
				var fileName = file.filename;
				var fileSize = file.size;
				var contentType = file.type;
				sails.log("Content-Type = "+contentType);
				if (fileSize > 0){
					sails.log("File size = " + fileSize);
					var fs = require('fs');
					var fileData = fs.readFileSync(filePath);
					var base64File = new Buffer(fileData).toString('base64');
					sails.log("base64 = "+base64File);
					//sails.log("fileData = "+ fileData);
					newPostRef.set({
						author: "Amicale",
						title: title,
						description: text,
						date: date,
						imagePresents: true,
						imageData: base64File,
						timestamp: timestamp,
						timestampInverse: timestampInverse
					}, function(error) {
						if (error) {
							sails.log("Data could not be saved." + error);
							return res.serverError();
						} else {
							sails.log("Data saved successfully.");
							res.redirect('/post');
						}});
					}
				} else {
					sails.log("no photo");
					newPostRef.set({
						author: "Amicale",
						title: title,
						description: text,
						date: date,
						imagePresents: false,
						imageData: "",
						timestamp: timestamp,
						timestampInverse: timestampInverse
					}, function(error) {
						if (error) {
							sails.log("Data could not be saved." + error);
							return res.serverError();
						} else {
							sails.log("Data saved successfully.");
							res.redirect('/post');
						}});
					}
				})

			},

 }
